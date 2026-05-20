import { createHashRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import PersonProfilePage from "./pages/PersonProfilePage";
import ExtendedAttributesPage from "./pages/ExtendedAttributesPage";
import BackgroundCheckInvite from "./pages/BackgroundCheckInvite";
import BackgroundCheckManual from "./pages/BackgroundCheckManual";
import ChildSafetyTraining from "./pages/ChildSafetyTraining";
import CandidateSelectionPage from "./pages/CandidateSelectionPage";
import CandidateSelectionSinglePage from "./pages/CandidateSelectionSinglePage";
import CandidateSelectionBulkPage from "./pages/CandidateSelectionBulkPage";
import BackgroundCheckInvitePage from "./pages/BackgroundCheckInvitePage";
import ChildSafetyTrainingInvitePage from "./pages/ChildSafetyTrainingInvitePage";
import DirectPluginOptionBPage from "./pages/DirectPluginOptionBPage";
import UnhappyPath from "./pages/UnhappyPath";

export const router = createHashRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/person-profile",
    Component: PersonProfilePage,
  },
  {
    path: "/extended-attributes",
    Component: ExtendedAttributesPage,
  },
  {
    path: "/candidate-selection",
    Component: CandidateSelectionPage,
  },
  {
    path: "/candidate-selection-single",
    Component: CandidateSelectionSinglePage,
  },
  {
    path: "/candidate-selection-bulk",
    Component: CandidateSelectionBulkPage,
  },
  {
    path: "/background-check-invite",
    Component: BackgroundCheckInvite,
  },
  {
    path: "/background-check-invite-form",
    Component: BackgroundCheckInvitePage,
  },
  {
    path: "/background-check-manual",
    Component: BackgroundCheckManual,
  },
  {
    path: "/child-safety-training",
    Component: ChildSafetyTraining,
  },
  {
    path: "/child-safety-training-invite-form",
    Component: ChildSafetyTrainingInvitePage,
  },
  {
    path: "/direct-plugin-option-b",
    Component: DirectPluginOptionBPage,
  },
  {
    path: "/unhappy-path",
    Component: UnhappyPath,
  },
]);