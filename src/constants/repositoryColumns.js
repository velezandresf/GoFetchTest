import Link from '@mui/material/Link';

const columns = [
    { id: 'description', label: 'Description', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'owner', label: 'Owner',  minWidth: 100 },
    { id: 'languages', label: 'Languages',  minWidth: 170 },
    { id: 'licence', label: 'Licence',  minWidth: 100 },
    { id: 'link', label: 'Link',
      render: rowData=><Link href={rowData} target="_blank">{rowData}</Link>
    },
  ];
  
export default columns;