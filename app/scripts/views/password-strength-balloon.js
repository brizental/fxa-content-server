/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import BaseView from './base';
import Template from '../templates/partial/password-tips-helper-balloon.mustache';
import { debounce } from 'underscore';

const DELAY_BEORE_UPDATE_MS = 750;
export default class PasswordStrengthBalloonView extends BaseView {
  template = Template;

  initialize (config) {
    const $passwordEl = config.passwordEl;
    $passwordEl.on('keyup', () => this.updateForPassword($passwordEl.val()));

    this.model.set({
      email: config.email,
      hasEnteredPassword: false,
      isCommon: false,
      isEmpty: true,
      isSafe: false,
      isSameAsEmail: false,
      isTooShort: true,
    });

    this.listenTo(this.model, 'change', this.render);
  }

  afterRender () {
    this._getBloomfilter();
  }

  setInitialContext (context) {
    context.set(this.model.toJSON());
  }

  _getBloomfilter () {
    return import(/* webpackChunkName: "fxa-password-strength-checker" */ 'fxa-password-strength-checker')
      .then(({ default: bloomfilter }) => bloomfilter);
  }

  updateForPassword = debounce(function(password) {
    this._getBloomfilter().then(bloomfilter => {
      const isTooShort = password.length < 8;
      const isSameAsEmail = password === this.model.get('email');
      // the bloomfilter only stores lowercased words.
      const isCommon = bloomfilter(password.toLowerCase());

      this.model.set({
        hasEnteredPassword: this.model.get('hasEnteredPassword') || password.length,
        isCommon,
        isSameAsEmail,
        isTooShort,
      });
    });
  }, DELAY_BEORE_UPDATE_MS);
}
