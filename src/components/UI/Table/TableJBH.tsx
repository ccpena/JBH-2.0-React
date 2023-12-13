import React, { Component, ReactElement } from "react";

// Material UI
import { Theme } from "@material-ui/core";
import { WithStyles, createStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import red from "@material-ui/core/colors/red";
import Color from "@material-ui/core";
import { CSSProperties } from "jss/css";
import { FontWeightProperty } from "csstype/index";

// Props & State

export interface ColJBH {
  name: string;
  title?: string;
  text_color?: any;
  fontWeight?: FontWeightProperty;
}

interface StyleTableProps {
  widthTable: string;
}

interface DataTableProps<T> {
  cols: Array<ColJBH>;
  data: Array<T>;
}
interface TableState {}

type TableProps<T> = DataTableProps<T> & StyleTableProps;

export default function wrap<T>(
  props: TableProps<T>
): ReactElement<TableProps<T>> {
  const styles = (theme: Theme) =>
    createStyles({
      paperTxTable: {
        width: props.widthTable,
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
      },
      txTable: {
        tableLayout: "fixed"
      }
    });

  const A = withStyles(styles)(
    class TableJBH<T> extends Component<
      TableProps<T> & WithStyles<typeof styles>,
      TableState
    > {
      render(): JSX.Element {
        const { classes, data, cols, widthTable } = this.props;
        let keyRows = 0;
        return (
          <>
            <Paper className={classes.paperTxTable}>
              <Table className={classes.txTable}>
                <TableHead>
                  <TableRow>
                    {cols.map(col => {
                      return (
                        <TableCell key={col.name} align="center">
                          {col.title ? col.title : col.name}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(row => {
                    keyRows++;
                    return (
                      <TableRow key={keyRows}>
                        {cols.map(col => {
                          return (
                            <TableCell
                              key={col.name}
                              align="center"
                              style={{
                                color: col.text_color,
                                fontWeight: col.fontWeight
                              }}
                            >
                              {this.getProperty(row, col.name)}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </>
        );
      }

      getProperty<T extends any, K extends keyof T | any>(
        objToFindProperty: T,
        keyToFind: K
      ) {
        let value = "---";
        try {
          let key = keyToFind;
          let obj = objToFindProperty;
          let splitKey = keyToFind.toString().split(".");

          for (let keyId = 0; keyId < splitKey.length - 1; keyId++) {
            obj = obj[splitKey[keyId]];
          }
          value = obj[splitKey[splitKey.length - 1]];
          if (value === undefined) {
            value = "---";
          }
        } catch (e) {
          //TODO Sent exception to some metrics?
        }

        return value;
      }
    }
  ) as any;

  return React.createElement(A, props);
}
