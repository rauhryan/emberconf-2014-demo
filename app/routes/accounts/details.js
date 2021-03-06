export default Ember.Route.extend({
  /**
    In normal scenarios, the {{link-to}} helper will work
    just fine and this isn't needed. In scenarios with manual
    URL manipulation or deep linking cases, we will need this
    model hook to yeild the correct "account" object.
  */
  model: function(params) {
    return this._filterAccountId(this.modelFor('accounts'), params.account_id);
  },
  _filterAccountId: function(array, x) {
    return array.filter(function(account) { return account.id == x; })[0];
  },
  actions: {
    didTransition: function() {
      if(!this.currentModel) {
        this.transitionTo('accounts');
      }
      return true;
    },
    cycleAccounts: function(curAccountId) {
      var model = this.modelFor('accounts');
      var index = (curAccountId === -1 || curAccountId === model.length) ? 1 : curAccountId + 1;
      this.transitionTo('accounts.details', this._filterAccountId(model, index));
    }
  }
});
