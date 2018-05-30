/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const {assert} = require('chai');
const BaseView = require('views/base');
const Cocktail = require('cocktail');
const LastCheckedTimeMixin = require('views/mixins/last-checked-time-mixin');

const View = BaseView.extend({});

Cocktail.mixin(
  View,
  LastCheckedTimeMixin
);

describe('views/mixins/last-checked-time-mixin', () => {
  let view;

  beforeEach(() => {
    view = new View({});
  });

  it('should set last checked time', () => {
    assert.equal(view.lastCheckedTime, undefined, 'no time set');
    view._setLastCheckedTime();
    assert.equal(typeof view.lastCheckedTime, 'string', 'time is set');
  });

  it('should return `none` if lastCheckTime is not set', () => {
    assert.equal(view.lastCheckedTime, undefined, 'no time set');
    const lastCheckString = view._getLastCheckedTimeString();
    assert.equal(lastCheckString, 'Last checked: none', 'time is set to `none`');
  });

  it('should return formatted time', () => {
    view._setLastCheckedTime('2018-05-30T16:58:06.343Z');
    const lastCheckString = view._getLastCheckedTimeString();
    assert.equal(lastCheckString, 'Last checked: 12:58 PM', 'formatted time is set');
  });
});
