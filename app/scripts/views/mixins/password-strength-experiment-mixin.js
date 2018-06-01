/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import PasswordStrengthBalloonView from '../password-strength-balloon';

export default function (config = {}) {
  return {
    afterRender () {
      const helperBalloon = new PasswordStrengthBalloonView({
        el: this.$(config.el),
        email: this.getAccount().get('email'),
        passwordEl: this.$(config.passwordEl)
      });
      this.trackChildView(helperBalloon);
      return helperBalloon.render();
    },

    setInitialContext (context) {
      context.set({
        showCustomHelperBalloon: true
      });
    },
  };
}
