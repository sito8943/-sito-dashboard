// Single entry point to @sito/ui: Button and IconButton share this module, so
// its stylesheet (@sito/ui + token mapping + overrides) is emitted once.
import "./sito-ui.css";

import { Button, IconButton } from "@sito/ui";

export const UiButton = Button;
export const UiIconButton = IconButton;
