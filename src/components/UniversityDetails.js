import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { PageHeader, Descriptions, Button, List } from 'antd';

import ErrorDisplay from '../shared/ErrorDisplay';

const UniversityDetails = props => {
	const { getUniversityDetails } = props.store;
	const universityId = useParams().universityId;
	const [university, setUniversity] = useState();
	
	useEffect(() => {
		const universityData = universityId ? getUniversityDetails(universityId) : {};
		setUniversity(universityData);
	}, [universityId, getUniversityDetails]);
	
	const getInnerContent = (value, list) => {
		let innerContent;
		
		if (list) {
			const items = Object.keys(value).map((key) => { 
				return value[key];
		 	});
		 	innerContent = <List bordered dataSource={items} renderItem={item => <List.Item>{item}</List.Item>} />
	 	} else {
	 		innerContent = value;
	 	}
	 	
	 	return innerContent;
	};
	
	const cardContent = university ? (
		<PageHeader
		  title={`Details of : ${university.name}`}
		  extra={[
		    <Button key="1" type="primary" onClick={() => window.history.back()}>
		      Back
		    </Button>
		  ]}
		>
			<Descriptions size="small" column={1} bordered>
				<Descriptions.Item label="Domain(s)">
					{getInnerContent(university.domains, true)}
				</Descriptions.Item>
				<Descriptions.Item label="Web page(s)">
					{getInnerContent(university.web_pages, true)}
				</Descriptions.Item>
				<Descriptions.Item label="Alpha Code">
					{getInnerContent(university.alpha_two_code, false)}
				</Descriptions.Item>
				<Descriptions.Item label="State Province">
					{getInnerContent(university['state-province'], false)}
				</Descriptions.Item>
				<Descriptions.Item label="Country">
					{getInnerContent(university.country, false)}
				</Descriptions.Item>
	  		</Descriptions>
  		</PageHeader>
	) : (
		<ErrorDisplay title="Details Missing" content="Sorry! University Details could not be found." />
	);
	
	return (
		<React.Fragment>
			{cardContent}
		</React.Fragment>
	)
};

export default observer(UniversityDetails);
