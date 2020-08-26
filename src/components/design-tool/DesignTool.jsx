import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory, withRouter } from 'react-router';
import FontAwesome from 'react-fontawesome';
import Joyride from 'react-joyride';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import { getJWT, getUserId } from 'helpers/users';
import { isMobile } from 'helpers/isMobile';
import { routeToHome, routeToProjects } from 'helpers/routeHelpers';
import checkCollision from 'helpers/checkCollision';
import getPerimeterSide from 'helpers/getPerimeterSide';
import getTimeStamp from 'helpers/getTimeStamp';
import rotate from 'helpers/rotate';

import { toolTips } from 'config/toolTips';
import { tourSteps, dependecyDemo } from './DesignToolTourSteps';
import { tutorialSteps } from './DesignToolTutorialSteps';
import DesignToolBoardFrame from './DesignToolBoardFrame';
import DesignToolInfoButton from './DesignToolInfoButton';
import DesignToolStage from './DesignToolStage';
import DocumentationCard from './DesignToolDocumentationCard';
import Footer from 'components/footer/Footer';
import Modal from 'components/modal/Modal';
import Module from 'components/modules/ModulesItem';
import SideBar from 'components/sidebar/SideBar';
import TopNavbar from 'components/top-navbar/TopNavbar';

import './design-tool-styles/_DesignToolDocumentationCard.scss';
import './design-tool-styles/_DesignToolOnboardModal.scss';


let DesignTool = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorialSteps,
      tourSteps,
      x: 0,
      y: 0,
      disabledIconExceptions: null,
      image: null,
      isDraggingToBoard: false,
      isNavMenuActive: false,
      isMobile: false,
      isSideBarHidden: false,
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
    this.updateClientPosition = this.updateClientPosition.bind(this);
    this.updateState = this.updateState.bind(this);

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
    const { projects } = this.props;
    const jwt = getJWT();
    const userId = getUserId();
    if (projects.length === 0 && true || jwt) {
      store.dispatch(actions.fetchProjects(userId, jwt))
    }

    this.addHanlders();
    this.checkIfMobile();
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

  calculateNewModuleCoordinates(coordinateData) {
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
    const { draggingModuleData, boardSpecs } = this.props;
    const { width, height, boundToSideIndex } = draggingModuleData;
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

    const testModule = Object.assign(testModuleCoordinates, draggingModuleData);
    const isNewModuleWithinBounds = checkCollision([testModule, boardSpecs]).length > 0;
    const adjustedModuleCoordinates = this.calculateNewModuleCoordinates(coordinateData);
    const newModule = Object.assign(adjustedModuleCoordinates, draggingModuleData);

    if (isNewModuleWithinBounds && isDraggingToBoard) {
      store.dispatch(actions.pushToCurrentProjectModules(newModule));
    } else {
      store.dispatch(actions.toggleShouldRenderSideBar(true));
    }

    this.timeOut = setTimeout(() => store.dispatch(actions.mouseDownOnIcon(false)), 1);
    this.setState({ isDraggingToBoard: false });
  }

  getOnboardModalHandlers(tutorialStep) {
    const getButtonMethods = () => {
      switch (tutorialStep) {
        case 0:
          const stepZeroRightButtonHandler = function () {
            store.dispatch(actions.startTutorial());
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
      // Keep internal state in sync with joyride
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
    const { currentProjectId } = this.props;
    store.dispatch(actions.updateProjectName(newName, currentProjectId));
  }

  handleKeyUp(evt) {
    const evtobj = window.event ? event : evt;
    const { isMouseOverModule, selectedModuleIndex } = this.props;

    if (isMouseOverModule && (evtobj.code === 'Delete' || evtobj.code === 'Backspace')) {
      store.dispatch(actions.deleteSelectedModule(selectedModuleIndex));
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

    this.dropDraggingModule(evt);
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

  recordSavedChanges() {
    store.dispatch(actions.toggleHasUnsavedChanges());
  }

  showAllModuleIcons() {
    store.dispatch(actions.updateIconVisibity('ALL'));
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
    store.dispatch(actions.toggleShouldRenderSideBar(false));
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

  updateLastSaved() {
    const lastSaved = getTimeStamp();
    store.dispatch(actions.updateLastSavedTime(lastSaved));
  }

  updateClientPosition(evt) {
    if (this.stageContainer) {
      const stageOffsetX = Number(this.stageContainer.getBoundingClientRect().left);
      const stageOffsetY = Number(this.stageContainer.getBoundingClientRect().top);
      const x = Number(evt.clientX) - stageOffsetX;
      const y = Number(evt.clientY) - stageOffsetY;

      this.setState({
        x,
        y,
      });
    }
  }

  updateState(url) {
    this.setState({ image: url });
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
    const { selectedModuleProps, anchorPositions, boardSpecs } = this.props;
    const rotationData = rotate(selectedModuleProps, anchorPositions, boardSpecs);
    store.dispatch(actions.rotateSelectedModule(rotationData));
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

  renderDraggingModule() {
    const { draggingModuleData } = this.props;
    const { x, y } = this.state;

    return (
      <Module
        x={x - (draggingModuleData.width / 2)}
        y={y - (draggingModuleData.height / 2)}
        width={draggingModuleData.width}
        height={draggingModuleData.height}
        id={'100'}
        imageHeight={draggingModuleData.imageHeight}
        imageNode={draggingModuleData.imageNode}
        imageSrc={draggingModuleData.imageSrc}
        imageWidth={draggingModuleData.imageWidth}
        imageX={draggingModuleData.imageX}
        imageY={draggingModuleData.imageY}
        stroke={draggingModuleData.stroke}
        strokeWidth={draggingModuleData.strokeWidth}
      />
    );
  }

  renderFooter() {
    const { currentProjectPrice, timeLastSaved } = this.props;

    if (this.state.shouldRenderInfoButton) {
      return (
        <Footer
          price={currentProjectPrice}
          timeLastSaved={timeLastSaved}
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
      autoStart: true,
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
    const { iconVisibityData, currentProjectModules, shouldRenderSideBar } = this.props;
    const { isDraggingToBoard, disabledIconExceptions } = this.state;

    if (shouldRenderSideBar) {
      return (
        <SideBar
          iconVisibityData={iconVisibityData}
          onBoardModulesLength={currentProjectModules.length}
          showAll={this.showAllModuleIcons}
          toggleDraggingToBoard={this.toggleDraggingToBoard}
          updateClientPosition={this.updateClientPosition}
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
      return null;
      // return (
      //   <DesignToolTodo
      //     handleLinkClick={handleLinkClick}
      //     todoBools={todoBools}
      //   />
      // );
    }

    return null;
  }

  render() {
    const { currentProjectName, currentProjectId, isSaving } = this.props;
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
          isSaving={isSaving}
          projectName={currentProjectName}
          recordSavedChanges={this.recordSavedChanges}
          updateLastSaved={this.updateLastSaved}
          updateThumbnail={this.toggleShouldUpadateThumbnail}

        />
        <div>
          <div ref={node => { this.stageContainer = node }}>
            {this.renderSideBar()}
            <DesignToolStage
              draggingModule={this.renderDraggingModule()}
              hideFloatingElements={this.hideFloatingElements}
              isDraggingToBoard={isDraggingToBoard}
              rotate={this.rotate}
              shouldExportPDF={shouldExportPDF}
              shouldHideContextMenu={shouldHideContextMenu}
              shouldRenderBoard={Boolean(currentProjectName)}
              shouldUpdateThumbnail={shouldUpdateThumbnail}
              toggleShouldExportPDF={this.toggleShouldExportPDF.bind(this)}
              toggleShouldUpadateThumbnail={this.toggleShouldUpadateThumbnail}
              unhideFloatingElements={this.unhideFloatingElements}
              updateState={this.updateState}
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
  const currentProjectId = state.currentProjectInfo.id;
  const projects = state.projects.items;
  const currentProject = projects.find(project => (
    project._id === currentProjectId
  ));
  const currentProjectThumbnail = currentProject
    ? currentProject.boardSpecs.thumbnail
    : null;

  return {
    currentProjectId,
    currentProjectThumbnail,
    anchorPositions: state.anchorPositions,
    boardSpecs: state.boardSpecs,
    currentProjectModules: state.currentProjectModules.present,
    currentProjectName: state.currentProjectInfo.name,
    currentProjectPrice: state.currentProjectInfo.price,
    draggingModuleData: state.draggingModule,
    hasUnsavedChanges: state.hasUnsavedChanges,
    iconVisibityData: state.iconVisibity,
    isMouseOverModule: state.mouseEvents.isMouseOverModule,
    isSaving: state.projects.isSaving,
    isTutorialActive: state.tutorial.isTutorialActive,
    modalType: state.modal.modalType,
    projects: state.projects.items,
    saveProjectTrigger: state.projects.saveProjectTrigger,
    selectedModuleIndex: state.selectedModule.index,
    selectedModuleProps: state.selectedModule,
    shouldRenderModal: state.modal.shouldRenderModal,
    shouldRenderSideBar: state.shouldRenderSideBar,
    shouldRenderTodoList: state.tutorial.shouldRenderTodoList,
    timeLastSaved: state.currentProjectInfo.timeLastSaved,
    todoBools: state.tutorial.todoBools,
    topLeftAnchorX: state.anchorPositions.topLeft.x,
    topLeftAnchorY: state.anchorPositions.topLeft.y,
    tutorialStep: state.tutorial.step,
  };
}
;

DesignTool = withRouter(DesignTool);
export default connect(mapStateToProps)(DesignTool);

DesignTool.propTypes = {
  anchorPositions: PropTypes.object.isRequired,
  boardSpecs: PropTypes.object.isRequired,
  currentProjectId: PropTypes.string,
  currentProjectModules: PropTypes.array.isRequired,
  currentProjectName: PropTypes.string,
  currentProjectPrice: PropTypes.string.isRequired,
  draggingModuleData: PropTypes.object.isRequired,
  hasUnsavedChanges: PropTypes.bool.isRequired,
  iconVisibityData: PropTypes.object.isRequired,
  isMouseOverModule: PropTypes.bool.isRequired,
  isTutorialActive: PropTypes.bool.isRequired,
  joyride: PropTypes.object,
  location: PropTypes.object.isRequired,
  modalType: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  selectedModuleIndex: PropTypes.number,
  selectedModuleProps: PropTypes.object.isRequired,
  shouldRenderModal: PropTypes.bool.isRequired,
  shouldRenderSideBar: PropTypes.bool.isRequired,
  shouldRenderTodoList: PropTypes.bool.isRequired,
  timeLastSaved: PropTypes.string,
  todoBools: PropTypes.array.isRequired,
  tutorialStep: PropTypes.number.isRequired,
};
