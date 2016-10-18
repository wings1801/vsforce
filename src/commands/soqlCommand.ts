
import * as vscode from 'vscode';
import {ICommand}  from './command';
import {Connection, IQueryResult} from '../connection';
import {SalesforceQueryBuilder} from '../builder/salesforceQueryBuilder';
import * as fs from 'fs';


export class SOQLCommand implements ICommand {
  // Salesforce connection handler
  private conn: Connection = new Connection();
  // Salesforce component query builder
  private builder: SalesforceQueryBuilder = new SalesforceQueryBuilder();

  constructor() { }

  public Execute() {
    vscode.window.showInputBox({ prompt: 'Query: ' })
      .then((query: string) => {
        let previewUri = vscode.Uri.parse("sf://salesforce.com/soqlquery?" + query);


        vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'SOQL Results').then(null, reason => {
          vscode.window.showErrorMessage(reason);
        });
      });
  }
}
