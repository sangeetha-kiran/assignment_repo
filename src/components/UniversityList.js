import React, { useEffect } from 'react';

import { observer } from 'mobx-react';
import { Table, Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import ErrorDisplay from '../shared/ErrorDisplay';

const UniversityList = (props) => {
    const { getUniversityData } = props.store;

    useEffect(() => {
        getUniversityData();
    }, [getUniversityData]);
    
	const getColumnSearchProps = dataIndex => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
		  <div style={{ padding: 8 }}>
			<Input
			  placeholder={`Search ${dataIndex}`}
			  value={selectedKeys[0]}
			  onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
			  onPressEnter={confirm}
			  style={{ marginBottom: 8, display: 'block' }}
			/>
			<Space>
			  <Button
				type="primary"
				onClick={confirm}
				icon={<SearchOutlined />}
				size="small"
				style={{ width: 90 }}
			  >
				Search
			  </Button>
			  <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
				Reset
			  </Button>
			</Space>
		  </div>
		),
		filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) =>
		  record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : ''
	});
    
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
        	<Link to={`/details/${record.key}`}>{text}</Link>
        ),
        ...getColumnSearchProps('name')
    }];
    
    const univerSityContent = props.store.loadErrorStatus ? (
    	<ErrorDisplay title="Data Load Issue" content="Sorry! University data could not be loaded." />
    ) : (
    	<Table 
    		columns={columns} 
    		dataSource={props.store.universityData} 
    		size="middle" 
    		bordered 
    		title={() => 'List of Universities in Canada'} 
    	/>
    );

    return (
		<React.Fragment>
			{univerSityContent}
		</React.Fragment>
    )
};

export default observer(UniversityList);
