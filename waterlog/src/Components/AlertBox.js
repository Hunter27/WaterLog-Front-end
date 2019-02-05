import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";

const styles = theme => ({
  High: {
    color: "#ff1744"
  },
  Medium: {
    color: "#ffab00"
  },
  Low: {
    color: "#ffea00"
  }
});

function BoxIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M6 6h12v12H6z" />
    </SvgIcon>
  );
}

function highStatus(props) {
  const { classes } = props;
  return (
    <div>
      <BoxIcon className={classes.High} />
    </div>
  );
}

function mediumStatus(props) {
  return (
    <div>
      <BoxIcon className={props.classes.Medium} />
    </div>
  );
}

function lowStatus(props) {
  return (
    <div>
      <BoxIcon className={props.classes.Low} />
    </div>
  );
}

export const HighStatusIcon = withStyles(styles)(highStatus);
export const MediumStatusIcon = withStyles(styles)(mediumStatus);
export const LowStatusIcon = withStyles(styles)(lowStatus);
