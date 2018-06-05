/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Mixin to set the time a panel was refreshed or checked.
 *
 * @mixin LastCheckedTimeMixin
 */
'use strict';

const {t} = require('../base');

const Mixin = {

  setInitialContext(context) {
    context.set({
      lastCheckedTime: this.getLastCheckedTimeString()
    });
  },

  setLastCheckedTime(date) {
    if (! date) {
      date = new Date();
    }
    this.lastCheckedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  getLastCheckedTimeString() {
    let time = t('none');
    if (this.lastCheckedTime) {
      time = this.lastCheckedTime;
    }
    return t('Last checked') + `: ${time}`;
  }
};

module.exports = Mixin;
