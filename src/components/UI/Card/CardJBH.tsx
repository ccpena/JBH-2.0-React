import React, { FunctionComponent, Fragment } from "react";
import PropTypes from "prop-types";

// Material UI
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";

import Badge from "@material-ui/core/Badge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


const defaultMaxWidth = 344;
const defaultImgMaxWidth = "100%";
const defaultCardHeight = "auto";
const defaultImgHeight = 194;

const styles = (theme: Theme) =>
  createStyles({
    card: {
      maxWidth: defaultMaxWidth,
      height: defaultCardHeight
    },
    avatar: {
      backgroundColor: red[500]
    },
    media: {
      // ⚠️ object-fit is not supported by IE 11.
      objectFit: "cover",
      justifyItems: "center",
      alignContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto"
    },
    actions: {
      display: "flex"
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    badge: {
      margin: theme.spacing.unit * 2,
      top: "0%",
      right: -10,
      // The border color match the background color.
      border: `2px solid ${
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[900]
      }`
    }
  });

export interface ActionCard {
  name: String;
  badgeContent?: number | null;
  onClick?: () => void;
}

export interface CardProps extends WithStyles<typeof styles> {
  cardMaxWidth?: any;
  imgMaxWidth?: any;
  imgHeight?: any;
  headerText: string;
  subtitle?: string;
  title?: string;
  summary?: string;
  actions?: Array<ActionCard>;
  raised?: boolean;
  showAvatar?: boolean;
  showHeaderActions?: boolean;
  image?: any;
  titleImg?: string;
}

const buildActions = (actions?: Array<ActionCard>, classes?: any) => {
  if (actions) {
    return actions.map((action, index) => {
      const badgeContent = action.badgeContent ? action.badgeContent : null;
      return (
        <Badge
          key={index}
          color="primary"
          invisible={badgeContent == null}
          badgeContent={badgeContent}
          classes={{ badge: classes.badge }}
        >
          <Button
            key={index}
            onClick={action.onClick}
            size="small"
            color="primary"
          >
            {action.name}
          </Button>
        </Badge>
      );
    });
  }

  return null;
};

const defaultAvatar = (classes: any, showAvatar?: boolean) => {
  return showAvatar ? (
    <Avatar aria-label="Recipe" className={classes.avatar}>
      A
    </Avatar>
  ) : null;
};

const buildHeaderActionsContent = (
  classes: any,
  showHeaderActions?: boolean
) => {
  return showHeaderActions ? (
    <IconButton>
      <MoreVertIcon />
    </IconButton>
  ) : null;
};

const cardJBH: FunctionComponent<CardProps> = props => {
  const {
    classes,
    title,
    headerText,
    subtitle,
    summary,
    actions,
    raised,
    showAvatar,
    showHeaderActions,
    image,
    titleImg
  } = props;
  const { cardMaxWidth, imgMaxWidth, imgHeight } = props;
  return (
    <Card
      raised={raised}
      elevation={1}
      className={classes.card}
      style={{ maxWidth: cardMaxWidth }}
    >
      {title ? (
        <CardHeader
          avatar={defaultAvatar(classes, showAvatar)}
          action={buildHeaderActionsContent(classes, showHeaderActions)}
          title={title}
          subheader={subtitle}
        />
      ) : null}
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {headerText}
          </Typography>
        </CardContent>
        {image ? (
          <CardMedia
            component="img"
            className={classes.media}
            image={image}
            title={titleImg}
            style={{
              maxWidth: imgMaxWidth,
              height: imgHeight
            }}
          />
        ) : null}

        {summary ? (
          <CardContent>
            <Typography component="p">{summary}</Typography>
          </CardContent>
        ) : null}
      </CardActionArea>
      <CardActions>{buildActions(actions, classes)}</CardActions>
    </Card>
  );
};

cardJBH.defaultProps = {
  cardMaxWidth: defaultMaxWidth,
  imgMaxWidth: defaultImgMaxWidth,
  imgHeight: defaultImgHeight
};

export default withStyles(styles)(cardJBH);
