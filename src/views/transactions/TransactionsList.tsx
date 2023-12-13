import React, { Component, Fragment } from "react";

// Material UI
import classNames from "classnames";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import { FontWeightProperty } from "csstype/index";

// Components
import TableJBH, { ColJBH } from "../../components/UI/Table/TableJBH";

//DTO
import AccountDTO from "../../payloads/dto/AccountsDTO";
import TransactionDTO from "../../payloads/dto/TransactionDTO";

// Services
import { getAccount } from "../../services/AccountService";

// Props
export interface TxListCustomProps extends WithStyles<typeof styles> {
  accountId: string;
}

interface TxListState {
  account: AccountDTO;
  isLoading: boolean;
  selected: Array<any>;
  order: string;
  orderBy: string;
  data: Array<any>;
  page: number;
  rowsPerPage: number;
}

class TransactionsList extends Component<TxListCustomProps, TxListState> {
  state: TxListState = {
    account: {
      id: "",
      description: "",
      activeBalance: 0,
      passiveBalance: 0,
      transactions: []
    },
    isLoading: true,
    selected: [],
    order: "asc",
    orderBy: "effectiveDate",
    data: [],
    page: 0,
    rowsPerPage: 5
  };

  componentDidMount() {
    getAccount(this.props.accountId)
      .then(data => {
        this.setState({
          account: data,
          isLoading: false,
          data: data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  cols: Array<ColJBH> = [
    { name: "effectiveDate", title: "Effective Date" },
    { name: "description", title: "Description" },
    {
      name: "subCategoryDTO.subCategoryDefault.categoryDefault.name",
      title: "Category"
    },
    { name: "subCategoryDTO.subCategoryDefault.name", title: "Sub Category" },
    {
      name: "totalValue",
      title: "Amount",
      text_color: green[600],
      fontWeight: "bolder"
    }
  ];

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    let account: AccountDTO = this.state.account as AccountDTO;
    let data = account.transactions;

    return (
      <>
        <TableJBH<TransactionDTO>
          data={data}
          cols={this.cols}
          widthTable="70%"
        />
      </>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3
    },
    table: {
      minWidth: 1020
    },
    tableWrapper: {
      overflowX: "auto"
    }
  });

export default withStyles(styles)(TransactionsList);
