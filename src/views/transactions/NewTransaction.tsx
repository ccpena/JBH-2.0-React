import React, { FunctionComponent } from "react";

// UI
import FormInputLabelJBH from "../../components/UI/Form/FormInputLabelJBH";
import FormJBH from "../../components/UI/Form/FormJBH";
import FormControlJBH from "../../components/UI/Form/FormControlJBH";
import TransactionDTO from "../../payloads/dto/TransactionDTO";

function registerTransaction() {
    console.log("Registering Transaction");
    return true
}

interface NewTransactionProps {
  accountId: string;
}

interface NewTransactionState {

}

const newTransaction: FunctionComponent<NewTransactionProps> = props => {
  const descriptionChanged = (newDescription: string) => {
    console.log("Description Changed!", newDescription);
  };

  

  return (
    <>
      <FormJBH
        titleForm="New Transaction.."
        subTitleForm=""
              onSubmit={registerTransaction}
      >
        <FormControlJBH required fullWidth={false}>
          <FormInputLabelJBH
            id="description"
            label="Description"
            changed={descriptionChanged}
            placeholder="Short description"
            autoFocus
            required
            error={false}
            errorMsg={null}
          />
        </FormControlJBH>
      </FormJBH>
    </>
  );
};

export default newTransaction;
