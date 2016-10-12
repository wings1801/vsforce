import vscode = require('vscode');

/**
 * TODO: give a description
 *
 * @param {vscode.Uri} uri file uri
 *
 * @return {string} Filename
 */
export function getFileNameFromUri(uri: vscode.Uri): string {
  return uri.path.replace(/^.*[\\\/]/, '');
}

/**
 * TODO: give a description
 *
 * @return {Thenable<string>} TODO: give a description
 */
export function findPackageXml(): Thenable<string> {
  return new Promise<string>((resolve, reject) => {
    var packages: vscode.QuickPickItem[] = [];

    vscode.workspace.findFiles('**/package.xml', '').then((values: vscode.Uri[]) => {

      if (values.length == 0) { // No package.xml found.

        vscode.window.showWarningMessage('Cannot find any package.xml');
        reject('Cannot find any package.xml');

      } else if (values.length == 1) { // Only one package.xml found, using this one

        vscode.window.showInformationMessage(`Found package.xml at ${values[0].fsPath}`);
        resolve(values[0].fsPath);

      } else { // Multiple package.xml found

        for (var i = 0; i < values.length; i++) {
          packages.push({
            label: values[i].fsPath.replace(vscode.workspace.rootPath, ''),
            description: '',
            detail: values[i].fsPath
          });
        }

        // Asks the user to choose between all package.xml files found
        vscode.window.showQuickPick(packages).then(val => {
          resolve(val.detail);
        });
      }

    },
      (reason: any) => {
        vscode.window.showErrorMessage(reason);
        reject(reason);
      });
  });
}

/**
 * This will build a saleforce uri string for SOQL
 * {@link buildApexComponentQuery}
 *
 * @param {string} component saleforce component name
 * @param {string} extension salesforce component extension
 *
 * @return {string} salesforce component uri
 */
export function buildSalesforceUri(component: string, extension: string): string {
  return `sf://salesforce.com/apexcomponent/${vscode.workspace.getConfiguration('vsforce.organization').get<string>('namespace')}/${component}.${extension}`;
}