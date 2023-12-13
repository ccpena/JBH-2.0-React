import React, { FunctionComponent, Fragment, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { mainRoot } from "../../constants/wrappedStyles";

// Components
import TransactionsList from "../transactions/TransactionsList";
import WithGoBack from "../../hoc/withGoBack/WithGoBack";

//UI
import ButtonJBH from "../../components/UI/Input/Button/ButtonJBH";

// Props
export interface AccountDetailsCustomProps {}
type AccountDetailsProps = RouteComponentProps<{
  id: string;
}> &
  AccountDetailsCustomProps;

const handlerMakeATransaction = () => {
  console.log("Handler");
};

const accountDetails: FunctionComponent<AccountDetailsProps> = props => {
  let accountId = props.match.params.id;

  return (
    <main>
      <div>Accounts Details</div>
      <ButtonJBH clicked={handlerMakeATransaction}>
        Make a Transaction
      </ButtonJBH>
      <TransactionsList accountId={accountId} />
      <WithGoBack />
    </main>
  );
};

export default withRouter(accountDetails);
