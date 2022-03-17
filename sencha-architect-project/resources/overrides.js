 Ext.override('Ext.form.field.Tag', {
    onKeyUp: function(e, t) {
		console.log('yep!');
        var me = this,
            inputEl = me.inputEl,
            rawValue = inputEl.dom.value,
            preventKeyUpEvent = me.preventKeyUpEvent;
 
        if (me.preventKeyUpEvent) {
            e.stopEvent();
 
            if (preventKeyUpEvent === true || e.getKey() === preventKeyUpEvent) {
                delete me.preventKeyUpEvent;
            }
 
            return;
        }
 
        if (me.multiSelect && me.delimiterRegexp && me.delimiterRegexp.test(rawValue) ||
                (me.createNewOnEnter && e.getKey() === e.ENTER)) {
            // Announce new value(s)
            if (me.createNewOnEnter && rawValue) {
                me.ariaErrorEl.dom.innerHTML =
                    Ext.String.formatEncode(me.ariaSelectedText, rawValue);
            }
 
            rawValue = Ext.Array.clean(rawValue.split(me.delimiterRegexp));
            inputEl.dom.value = '';
 
            me.setValue(me.valueStore.getRange().concat(rawValue), true);
 
            inputEl.focus();
        }
 
        if (this.growMax && this.growMax >= this.itemList.getHeight()) {
            this.autoSize();
        }
 
        me.callParent([e, t]);
    }
 });