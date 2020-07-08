import React from 'react';

import BaseHeader from './BaseHeader';
import TasksViewSwitcher from './TasksViewSwitcher';

interface Props {}

const StartScreenHeader: React.FunctionComponent<Props> = () => {
  return <BaseHeader title={<TasksViewSwitcher />} />;
};

export default StartScreenHeader;
