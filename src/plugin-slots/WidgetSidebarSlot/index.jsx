import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
// eslint-disable-next-line arrow-body-style
export const WidgetSidebarSlot = () => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.widget_sidebar.v1"
    idAliases={['widget_sidebar_slot']}
  />
);

export default WidgetSidebarSlot;
