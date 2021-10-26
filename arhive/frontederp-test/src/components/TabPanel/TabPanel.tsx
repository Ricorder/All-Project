import React from 'react'

//================================================================================
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

//================================================================================
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}

//================================================================================
export default TabPanel
