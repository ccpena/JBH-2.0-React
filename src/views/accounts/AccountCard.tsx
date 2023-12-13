import React, { FunctionComponent } from "react";

// UI
import CardJBH, { ActionCard } from "../../components/UI/Card/CardJBH";

import accountImg from "../../assets/images/accounts/accounts-main-card.png";
import { number, checkPropTypes } from "prop-types";
import { RouteComponentProps, withRouter } from "react-router";

interface AcccountCardProps {
  totalAccounts?: number | null;
}

type AccountCardTypeProps = RouteComponentProps<{}> & AcccountCardProps;

const okHandler = (props:any) => {  
  props.history.push("/accounts");
};

const buildActions = (props: any, total?: number | null,) => {
  const actions: Array<ActionCard> = [
    {
      name: "See",
      badgeContent: total,
      onClick: () => okHandler(props)
    }
  ];
  return actions;
};

const accountCard: FunctionComponent<AccountCardTypeProps> = props => {
  const summary = "Connect to accounts and manage your transactions!, ";

  const { totalAccounts } = props;

  console.log("AccountCard", props);

  return (
    <CardJBH
      imgMaxWidth={"50%"}
      image={accountImg}
      raised
      headerText="Accounts"
      summary={summary}
      actions={buildActions(props, totalAccounts)}
      titleImg="See your Accounts"
    />
  );
};

export default withRouter(accountCard);
