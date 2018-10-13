import orm from '../../schema/schema';
import { projects } from '../../data/projects';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory, withRouter } from 'react-router';
import FontAwesome from 'react-fontawesome';
import Joyride from 'react-joyride';
import { Maybe } from 'monet';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import checkCollision from 'helpers/checkCollision';
import getPerimeterSide from 'helpers/getPerimeterSide';
import { routeToHome, routeToProjects } from 'helpers/routeHelpers';
import { isMobile } from 'helpers/isMobile';
import rotate from 'helpers/rotate';

import Board from 'components/board/Board';
import Module from 'components/modules/ModulesItem';
import ModuleContainer from 'components/modules/Modules';
import TopNavbar from 'components/top-navbar/TopNavbar';
import SideBar from 'components/side-bar/SideBar';
import Footer from 'components/footer/Footer';
import Modal from 'components/modal/Modal';
import { toolTips } from 'config/toolTips';
import DesignToolStage from './DesignToolStage';
import DesignToolInfoButton from './DesignToolInfoButton';
import DocumentationCard from './DesignToolDocumentationCard';
import DesignToolBoardFrame from './DesignToolBoardFrame';
import DesignToolTodo from './DesignToolTodo';
import { tourSteps, dependecyDemo } from './DesignToolTourSteps';
import { tutorialSteps } from './DesignToolTutorialSteps';

import './design-tool-styles/_DesignToolDocumentationCard.scss';
import './design-tool-styles/_DesignToolOnboardModal.scss';

import { devMode } from 'config/devMode';

const getProjectById = (projects) => (id) => projects.find((project) => project._id === id);
const getActiveProjectName = (activeProject) => activeProject.name;

const maybeGetProjectById = (projects) => (id) => (
  Maybe.fromNull(projects)
    .chain(projects => (
      Maybe.fromNull(getProjectById(projects)(id))
  ))
  .val
);

const maybeGetActiveProjectName = (projects) => (activeProjectId) => (
  Maybe.fromNull(maybeGetProjectById(projects)(activeProjectId))
    .map(getActiveProjectName)
    .orSome('')
);

let DesignTool = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorialSteps,
      tourSteps,
      disabledIconExceptions: null,
      isDraggingToBoard: false,
      isNavMenuActive: false,
      isMobile: false,
      joyrideStep: 0,
      running: false,
      shouldExportPDF: false,
      shouldHideContextMenu: false,
      shouldRenderDocumentation: false,
      shouldRenderInfoButton: true,
      shouldRenderModal: true,
      shouldUpdateThumbnail: false,
      wasDocumentationOpen: false,
    };
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
    this.handleRightButtonClick = this.handleRightButtonClick.bind(this);
    this.hideFloatingElements = this.hideFloatingElements.bind(this);
    this.rotate = this.rotate.bind(this);
    this.toggleDocumentationCard = this.toggleDocumentationCard.bind(this);
    this.toggleDraggingToBoard = this.toggleDraggingToBoard.bind(this);
    this.toggleNavMenu = this.toggleNavMenu.bind(this);
    this.toggleShouldUpadateThumbnail = this.toggleShouldUpadateThumbnail.bind(this);
    this.unhideFloatingElements = this.unhideFloatingElements.bind(this);

    this.bound_handleKeyUp = this.handleKeyUp.bind(this);
    this.bound_handleMouseDown = this.handleMouseDown.bind(this);
    this.bound_handleMouseUp = this.handleMouseUp.bind(this);
  }

  static defaultProps = {
    joyride: {
      autoStart: true,
      resizeDebounce: false,
      run: false,
    },
  };

  addHanlders() {
    document.body.addEventListener('mousedown', this.bound_handleMouseDown);
    document.body.addEventListener('mouseup', this.bound_handleMouseUp);
    document.body.addEventListener('mousemove', this.bound_handleMouseMove);
    document.body.addEventListener('keyup', this.bound_handleKeyUp);
    document.onkeydown = this.handleKeyPress;

    window.onpopstate = this.toggleShouldUpadateThumbnail.bind(this);
    window.onresize = this.checkIfMobile.bind(this);
  }

  removeHanlders() {
    document.body.removeEventListener('mousedown', this.bound_handleMouseDown);
    document.body.removeEventListener('mouseup', this.bound_handleMouseUp);
    document.body.removeEventListener('mousemove', this.bound_handleMouseMove);
    document.body.removeEventListener('keyup', this.bound_handleKeyUp);
  }

  componentDidMount() {
    if (this.props.projects.length === 0) {
      const projectId = this.props.params.projectId;
      const currentRoute = this.props.location.pathname;
      store.dispatch(actions.fetchProjectById(projectId, currentRoute));

////////////////////////////////////////////

      setTimeout(() => {
        store.dispatch({
        type: 'UPDATE_ORM',
        payload: { projects },
      }, 0);
      })

      setTimeout(() => {
        store.dispatch({
        type: 'UPDATE_MODULE',
      }, 2000);
      })

    }

    this.addHanlders();
    this.checkIfMobile();
    store.dispatch(actions.startTutorialIfNotOffered());
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.saveProjectTrigger !== this.props.saveProjectTrigger) {
      // *refactor to not depend on setTimeout
      setTimeout(() => store.dispatch(actions.updateProject(this.props)), 0);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
    this.removeHanlders();
  }

  addTooltip(toolTipData) {
    this.joyride.addTooltip(toolTipData);
  }

  getNewModuleCoordinates(coordinateData) {
    const cd = coordinateData;
    const boundToSide = getPerimeterSide(cd.boundToSideIndex) || null;

    switch (boundToSide) {
      case 'top':
        return {
          x: cd.moduleX - cd.boardX - (cd.width / 2),
          y: 0,
        };
      case 'bottom':
        return {
          x: cd.moduleX - cd.boardX - (cd.width / 2),
          y: cd.boardHeight - cd.height,
        };
      default:
        return {
          x: cd.moduleX - cd.boardX - (cd.width / 2),
          y: cd.moduleY - cd.boardY - (cd.height / 2),
        };
    }
  }

  checkIfMobile() {
    this.setState({ isMobile: isMobile() });
  }

  dropDraggingModule(evt) {
    const { draggingModuleData, boardSpecs, anchorPositions } = this.props;
    const { width, height, boundToSideIndex } = draggingModuleData;
    const { topLeft } = anchorPositions;
    const { isDraggingToBoard } = this.state;
    const { clientX: x , clientY: y } = evt;

    const coordinateData = {
      width,
      height,
      boundToSideIndex,
      moduleX: x,
      moduleY: y,
      boardX: boardSpecs.x,
      boardY: boardSpecs.y,
      boardHeight: boardSpecs.height,
    };

    const testModuleCoordinates = {
      x: x - (width / 2),
      y: y - (height / 2),
    };

    const adjustedBoardSpecs = Object.assign({}, boardSpecs, {
      x: boardSpecs.x + topLeft.x,
      y: boardSpecs.y + topLeft.y,
    });

    const testModule = Object.assign({}, testModuleCoordinates, draggingModuleData);
    const isNewModuleWithinBounds = checkCollision([testModule, adjustedBoardSpecs]).length > 0;

    if (isNewModuleWithinBounds && isDraggingToBoard) {
      const adjustedModuleCoordinates = this.getNewModuleCoordinates(coordinateData);
      const newModule = Object.assign({}, adjustedModuleCoordinates, draggingModuleData);

      store.dispatch(actions.pushToactiveModules(newModule));
    }

    this.timeOut = setTimeout(() => store.dispatch(actions.isMouseDownOnIcon(false)), 1);
    this.setState({ isDraggingToBoard: false });
  }

  getOnboardModalHandlers(tutorialStep) {
    const getButtonMethods = () => {
      switch (tutorialStep) {
        case 0:
          const stepZeroRightButtonHandler = function () {
            store.dispatch(actions.incrementTutorialStep());
            store.dispatch(actions.toggleTutorialIsActive());
          };
          const stepZeroLeftButtoHandler = function () {
            store.dispatch(actions.toggleModal());
            this.toggleDocumentationCard();
          };
          return {
            handleRightButtonClick: stepZeroRightButtonHandler,
            handleLeftButtonClick: stepZeroLeftButtoHandler.bind(this),
          };
        case 2:
          return {
            handleRightButtonClick: this.startTour.bind(this),
            handleLeftButtonClick: () => store.dispatch(actions.decrementTutorialStep()),
          };
        case 3:
          const stepThreeClickHandler = function () {
            store.dispatch(actions.incrementTutorialStep());
            store.dispatch(actions.updateDisabledIconExceptions([0]));
            store.dispatch(actions.toggleModal());
          };
          return {
            handleRightButtonClick: stepThreeClickHandler.bind(this),
            handleLeftButtonClick: this.startTour.bind(this),
            handleDidMount: this.addTooltip.bind(this, toolTips[0]),
          };
        case 5:
          return {
            handleRightButtonClick: this.restartTour.bind(this),
            handleLeftButtonClick: () => store.dispatch(actions.decrementTutorialStep()),
          };
        case 6:
          const stepThreeSixClickHandler = function () {
            store.dispatch(actions.incrementTutorialStep());
            store.dispatch(actions.toggleModal());
          };
          return {
            handleRightButtonClick: stepThreeSixClickHandler.bind(this),
            handleLeftButtonClick: this.startTour.bind(this),
            handleDidMount: this.addTooltip.bind(this, toolTips[1]),
          };
        case 9:
          const stepNineClickHandler = function () {
            store.dispatch(actions.incrementTutorialStep());
            store.dispatch(actions.toggleModal());
          };
          return {
            handleRightButtonClick: stepNineClickHandler.bind(this),
            handleLeftButtonClick: () => store.dispatch(actions.decrementTutorialStep()),
            handleDidUpdate: this.addTooltip.bind(this, toolTips[2]),
          };
        case 12:
          const stepTwelveClickHandler = function () {
            store.dispatch(actions.incrementTutorialStep());
            store.dispatch(actions.toggleModal());
            store.dispatch(actions.updateShouldRenderTodoList(true));
          };
          return {
            handleRightButtonClick: stepTwelveClickHandler.bind(this),
            handleLeftButtonClick: () => store.dispatch(actions.decrementTutorialStep()),
          };
        case 13:
          const stepThirteenClickHandler = function () {
            store.dispatch(actions.exitTutorial());
            this.toggleDocumentationCard();
          };
          return {
            handleRightButtonClick: stepThirteenClickHandler.bind(this),
          };

        default:
          return {
            handleRightButtonClick: () => store.dispatch(actions.incrementTutorialStep()),
            handleLeftButtonClick: () => store.dispatch(actions.decrementTutorialStep()),
          };
      }
    };

    const handleCloseFunction = function () {
      store.dispatch(actions.changeModalType('CONFIRM'));
    };

    const handleClose = {
      handleCloseButtonClick: handleCloseFunction.bind(this),
    };
    const buttonMethods = getButtonMethods(tutorialStep);
    const modalClass = { modalClass: `modal-step-${this.props.tutorialStep}` };
    return Object.assign(buttonMethods, handleClose, modalClass);
  }

  handleJoyrideCallback(result) {
    const { joyride } = this.props;

    if (result.type === 'step:before') {
      this.setState({ step: result.index });
    }

    if (result.type === 'finished') {
      store.dispatch(actions.incrementTutorialStep());
      store.dispatch(actions.toggleModal());
      this.setState({
        running: false,
        joyrideStep: 0,
        tourSteps: dependecyDemo,
      });
    }

    if (result.type === 'error:target_not_found') {
      this.setState({
        step: result.action === 'back' ? result.index - 1 : result.index + 1,
        autoStart: result.action !== 'close' && result.action !== 'esc',
      });
    }

    if (typeof joyride.callback === 'function') {
      joyride.callback();
    }
  }

  handleKeyPress(evt) {
    const evtobj = window.event ? event : evt;

    if (evtobj.keyCode === 90 && evtobj.ctrlKey) {
      store.dispatch(actions.undo());
    }

    if (evtobj.keyCode === 89 && evtobj.ctrlKey) {
      store.dispatch(actions.redo());
    }
  }

  handleNameChange(newName) {
    const { activeProjectId } = this.props;
    store.dispatch(actions.updateProjectName(newName, activeProjectId));
  }

  handleKeyUp(evt) {
    const evtobj = window.event ? event : evt;
    const { isMouseOverModule, hoveredModuleIndex } = this.props;

    if (isMouseOverModule && (evtobj.code === 'Delete')) {
      store.dispatch(actions.deleteHoveredModule(hoveredModuleIndex));
    }
  }

  handleMouseDown(evt) {
    if (evt.which === 1) {
      store.dispatch(actions.toggleIsMouseDown(true));
    }
  }

  handleMouseUp(evt) {
    if ((evt.which === 1) && !this.state.shouldHideContextMenu) {
      this.toggleShouldHideContextMenu(true);
    }

    if ((evt.which === 3) && this.props.isMouseOverModule) {
      this.toggleShouldHideContextMenu(false);
    }

    if (this.state.isDraggingToBoard) {
      this.dropDraggingModule(evt);
    }

    store.dispatch(actions.toggleIsMouseDown(false));
  }

  handleRightButtonClick() {
    if (this.state.joyrideStep === 1) {
      this.joyride.next();
    }
  }

  hideFloatingElements() {
    if (!this.props.isMouseOverModule) {
      store.dispatch(actions.updateShouldRenderTodoList(false));
      this.setState({
        shouldRenderDocumentation: false,
        shouldRenderInfoButton: false,
      });
    }
  }

  showAllModuleIcons() {
    store.dispatch(actions.updateShowAllIcons(true));
  }

  toggleDocumentationCard() {
    const { shouldRenderDocumentation, wasDocumentationOpen } = this.state;
    this.setState({
      shouldRenderDocumentation: !shouldRenderDocumentation,
      wasDocumentationOpen: !wasDocumentationOpen,
      tooltipHook: null,
    });
  }

  toggleNavMenu() {
    const { isNavMenuActive } = this.state;

    this.setState({ isNavMenuActive: !isNavMenuActive });
  }

  toggleDraggingToBoard() {
    this.setState({ isDraggingToBoard: true });
  }

  toggleShouldExportPDF() {
    const { shouldExportPDF } = this.state;
    this.setState({
      shouldExportPDF: !shouldExportPDF,
    });
  }

  toggleShouldHideContextMenu(boolean) {
    this.setState({
      shouldHideContextMenu: boolean,
    });
  }

  toggleShouldUpadateThumbnail() {
    this.setState({
      shouldUpdateThumbnail: !this.state.shouldUpdateThumbnail,
    });
  }

  unhideFloatingElements() {
    const { wasDocumentationOpen } = this.state;
    const { isTutorialActive, tutorialStep } = this.props;

    if (isTutorialActive && tutorialStep === 13) {
      store.dispatch(actions.updateShouldRenderTodoList(true));
    }

    this.setState({
      shouldRenderDocumentation: wasDocumentationOpen,
      shouldRenderInfoButton: true,
    });
  }

  restartTour() {
    store.dispatch(actions.toggleModal());
    this.joyride.reset(true);
  }

  rotate() {
    const { hoveredModuleProps, anchorPositions, boardSpecs } = this.props;
    const rotationData = rotate(hoveredModuleProps, anchorPositions, boardSpecs);
    store.dispatch(actions.rotateHoveredModule(rotationData));
  }

  startTour() {
    store.dispatch(actions.toggleModal());
    this.setState({
      running: true,
      joyrideStep: 0,
    });
  }

  renderBoardFrame() {
    const { tutorialStep, boardSpecs } = this.props;

    if (tutorialStep === 2) {
      return (
        <DesignToolBoardFrame
          width={boardSpecs.width + 27}
          height={boardSpecs.height + 27}
          top={boardSpecs.y - 14}
          left={boardSpecs.x - 14}
        />
      );
    }

    return null;
  }

  renderFooter() {
    const { activeModules } = this.props;

    if (this.state.shouldRenderInfoButton) {
      return (
        <Footer
          modules={activeModules}
        />
      );
    }

    return null;
  }

  renderInfoButton() {
    const { shouldRenderDocumentation } = this.state;
    const infoButtonIconClass = shouldRenderDocumentation ? 'fa-close' : 'fa-question';

    const infoButtonIcon = (
      <FontAwesome
        className={infoButtonIconClass}
        name={infoButtonIconClass}
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
    );

    return (
      <DesignToolInfoButton
        clickHandler={this.toggleDocumentationCard}
        icon={infoButtonIcon}
      />
    );
  }

  renderJoyride() {
    const { joyride } = this.props;

    const joyrideProps = {
      autoStart: true || joyride.autoStart || this.state.autoStart,
      callback: this.handleJoyrideCallback,
      debug: false,
      disableOverlay: true,
      resizeDebounce: joyride.resizeDebounce,
      run: this.state.running,
      scrollToFirstStep: joyride.scrollToFirstStep || true,
      stepIndex: 0,
      steps: this.state.tourSteps,
      type: 'continuous',
      locale: { next: 'Next', last: 'Next', back: 'Back' },
    };

    return (
      <Joyride
        {...joyrideProps}
        ref={node => (this.joyride = node)}
      />
    );
  }

  renderModal() {
    const { tutorialStep, shouldRenderModal, modalType } = this.props;
    const { tutorialSteps } = this.state;

    if (shouldRenderModal) {
      switch (modalType) {
        case 'ONBOARD':
          const onboardModalMethods = this.getOnboardModalHandlers(tutorialStep);
          const onboardModalProps = Object.assign(tutorialSteps[tutorialStep], onboardModalMethods);

          return (
            <Modal
              {...onboardModalProps}
            />
          );
        case 'CONFIRM':
          let rightButtonClick = function () {
            store.dispatch(actions.exitTutorial());
            this.toggleDocumentationCard();
          };
          rightButtonClick = rightButtonClick.bind(this);
          return (
            <Modal
              handleCloseButtonClick={() => store.dispatch(actions.exitTutorial())}
              handleLeftButtonClick={() => store.dispatch(actions.resumeTutorial())}
              handleRightButtonClick={rightButtonClick}
              leftButtonText="Go Back"
              modalClass="confirm-exit-tutorial"
              rightButtonText="Exit"
              shouldRenderLeftButton
              text="Are you sure you want to exit the tutorial?"
            />
          );
        default:
          throw new Error('Unexpected modal type');
      }
    }

    return null;
  }

  renderSideBar() {
   const {
     activeModules,
     showAllIcons,
     clickedModuleIndex,
     moduleData,
   } = this.props;

    const { isDraggingToBoard, disabledIconExceptions } = this.state;

    if (!isDraggingToBoard) {
      return (
        <SideBar
          activeModules={activeModules}
          showAllIcons={showAllIcons}
          clickedModuleIndex={clickedModuleIndex}
          moduleData={moduleData}
          activeModulesLength={activeModules.length}
          showAll={this.showAllModuleIcons}
          toggleDraggingToBoard={this.toggleDraggingToBoard}
        />
      );
    }

    return null;
  }

  renderTodo() {
    const { shouldRenderTodoList, todoBools } = this.props;

    const handleLinkClick = () => {
      store.dispatch(actions.changeModalType('CONFIRM'));
      store.dispatch(actions.toggleModal());
    };

    if (shouldRenderTodoList) {
      return (
        <DesignToolTodo
          handleLinkClick={handleLinkClick}
          todoBools={todoBools}
        />
      );
    }

    return null;
  }

  render() {
   const {
     activeProjectName,
     activeProjectId,
     isFetching,
     showSavingMessage,
     projects
   } = this.props;

    const {
      isDraggingToBoard,
      isNavMenuActive,
      shouldExportPDF,
      shouldUpdateThumbnail,
      shouldRenderDocumentation,
      shouldRenderInfoButton,
      shouldHideContextMenu,
    } = this.state;

    return (
      <div>
        {this.renderJoyride()}
        {this.renderBoardFrame()}
        <TopNavbar
          handleExportButtonClick={this.toggleShouldExportPDF.bind(this)}
          handleNameChange={this.handleNameChange.bind(this)}
          handleHomeButtonClick={routeToHome}
          handleProjectsButtonClick={routeToProjects}
          handleMenuClick={this.toggleNavMenu}
          isNavMenuActive={isNavMenuActive}
          showSavingMessage={showSavingMessage}
          projectName={activeProjectName}
          updateLastSaved={this.updateLastSaved}
          updateThumbnail={this.toggleShouldUpadateThumbnail}
        />
        <div>
          <div ref={node => { this.stageContainer = node }}>
            {this.renderSideBar()}
            <DesignToolStage
              hideFloatingElements={this.hideFloatingElements}
              isDraggingToBoard={isDraggingToBoard}
              rotate={this.rotate}
              shouldExportPDF={shouldExportPDF}
              shouldHideContextMenu={shouldHideContextMenu}
              shouldRenderBoard={!isFetching}
              shouldUpdateThumbnail={shouldUpdateThumbnail}
              toggleShouldExportPDF={this.toggleShouldExportPDF.bind(this)}
              toggleShouldUpadateThumbnail={this.toggleShouldUpadateThumbnail}
              unhideFloatingElements={this.unhideFloatingElements}
            />
          </div>
        </div>
        {this.renderFooter()}
        {shouldRenderDocumentation && <DocumentationCard />}
        {shouldRenderInfoButton && this.renderInfoButton()}
        {this.renderModal()}
        {this.renderTodo()}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const activeProjectId = state.projects.activeProjectId;
  const projects = state.projects.items;
  // const getProjects = (state) => orm.session(state.entities).Project.all().toRefArray();
  // const projects = getProjects(state);
  const activeProject = maybeGetProjectById(projects)(activeProjectId);
  const activeProjectName = maybeGetActiveProjectName(projects)(activeProjectId);
  const activeProjectThumbnail = (activeProject
    ? activeProject.boardSpecs.thumbnail
    : null
  );

  // const projectModel = orm.session(state.entities).Project
  const moduleModel = orm.session(state.entities).Module;
  // const module = moduleModel.all().toRefArray();
  const module = moduleModel.filter({ project: 1 }).all().toRefArray();

  return {
    activeProjectId,
    activeProjectName,
    activeProjectThumbnail,
    anchorPositions: state.anchorPositions,
    boardSpecs: state.boardSpecs,
    activeProjectId: state.projects.activeProjectId,
    activeModules: state.activeModules.present,
    draggingModuleData: state.modules.dragging,
    showAllIcons: state.sideBar.showAllIcons,
    isMouseOverModule: state.mouseEvents.isMouseOverModule,
    isFetching: state.projects.isFetching,
    showSavingMessage: state.nav.showSavingMessage,
    isTutorialActive: state.tutorial.isActive,
    clickedModuleIndex: state.modules.clickedIndex,
    modalType: state.modal.modalType,
    moduleData: state.modules.dataList,
    projects: state.projects.items,
    saveProjectTrigger: state.triggers.saveProjectTrigger,
    hoveredModuleIndex: state.modules.hovered.index,
    hoveredModuleProps: state.modules.hovered,
    shouldRenderModal: state.modal.shouldRenderModal,
    shouldRenderTodoList: state.tutorial.shouldRenderTodoList,
    todoBools: state.tutorial.todoBools,
    topLeftAnchorX: state.anchorPositions.topLeft.x,
    topLeftAnchorY: state.anchorPositions.topLeft.y,
    tutorialStep: state.tutorial.step,
  };
};

DesignTool = withRouter(DesignTool);
export default connect(mapStateToProps)(DesignTool);

DesignTool.propTypes = {
  anchorPositions: PropTypes.object.isRequired,
  boardSpecs: PropTypes.object.isRequired,
  activeProjectId: PropTypes.string,
  activeModules: PropTypes.array.isRequired,
  // draggingModuleData: PropTypes.object.isRequired,
  showAllIcons: PropTypes.bool.isRequired,
  isMouseOverModule: PropTypes.bool.isRequired,
  isTutorialActive: PropTypes.bool.isRequired,
  joyride: PropTypes.object,
  location: PropTypes.object.isRequired,
  modalType: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  hoveredModuleIndex: PropTypes.number,
  hoveredModuleProps: PropTypes.object.isRequired,
  shouldRenderModal: PropTypes.bool.isRequired,
  shouldRenderTodoList: PropTypes.bool.isRequired,
  todoBools: PropTypes.array.isRequired,
  tutorialStep: PropTypes.number.isRequired,
};
