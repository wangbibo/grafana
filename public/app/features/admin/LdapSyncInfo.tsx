import React, { PureComponent } from 'react';
import { dateTime } from '@grafana/data';
import { SyncInfo } from 'app/types';

interface Props {
  ldapSyncInfo: SyncInfo;
  headingStyle: string;
  tableStyle: string;
}

interface State {
  isSyncing: boolean;
}

const syncTimeFormat = 'dddd YYYY-MM-DD HH:mm zz';

export class LdapSyncInfo extends PureComponent<Props, State> {
  state = {
    isSyncing: false,
  };

  handleSyncClick = () => {
    console.log('Bulk-sync now');
    this.setState({ isSyncing: !this.state.isSyncing });
  };

  render() {
    const { headingStyle, ldapSyncInfo, tableStyle } = this.props;
    const { isSyncing } = this.state;
    const nextSyncTime = dateTime(ldapSyncInfo.nextSync).format(syncTimeFormat);
    const prevSyncSuccessful = ldapSyncInfo && ldapSyncInfo.prevSync;
    const prevSyncTime = prevSyncSuccessful ? dateTime(ldapSyncInfo.prevSync.started).format(syncTimeFormat) : '';

    return (
      <>
        <h4 className={headingStyle}>
          LDAP Synchronisation
          <button className={`btn btn-secondary pull-right`} onClick={this.handleSyncClick}>
            <span className="btn-title">Bulk-sync now</span>
            {isSyncing && <i className="fa fa-spinner fa-fw fa-spin run-icon" />}
          </button>
        </h4>
        <table className={`${tableStyle} filter-table form-inline`}>
          <tbody>
            <tr>
              <td>Active synchronisation</td>
              <td colSpan={2}>{ldapSyncInfo.enabled ? 'Enabled' : 'Disabled'}</td>
            </tr>
            <tr>
              <td>Scheduled</td>
              <td>{ldapSyncInfo.schedule}</td>
            </tr>
            <tr>
              <td>Next scheduled synchronisation</td>
              <td>{nextSyncTime}</td>
            </tr>
            <tr>
              <td>Last synchronisation</td>
              {prevSyncSuccessful && (
                <>
                  <td>{prevSyncTime}</td>
                  <td>Successful</td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
