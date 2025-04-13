import React from 'react';
import logo from './../../assets/finalogo.png';
import { CopyLink, Terminated, PieChart } from '../../components';
import './status.css';

const mockList = [
	{
		studentID: '210508010003',
		warningCnt: 5,
		message: 'DevTools detected'
	},
	{
		studentID: '210508010040',
		warningCnt: 4,
		message: 'Noise detected'
	},
	{
		studentID: '2105080100054',
		warningCnt: 6,
		message: 'Face covered'
	},
	{
		studentID: '2105080100063',
		warningCnt: 2,
		message: 'Full Screen Closed'
	}
];

const Status = ({
	time = '20/03/2025 17:30',
	name = 'Testing',
	link = 'asd-qwvs-dfs'
}) => {
	return (
		<div className="status-dashboard">
			<div className="logo">
				<img src={logo} alt="HawkEye-logo" />
			</div>

			<h1 className="title-heading">Test Dashboard</h1>

			<div className="test-details">
				<div className="test-item">
					<h4 className="test-time">{time}</h4>

					<h4 className="test-name">{name}</h4>

					<CopyLink link={link} />
				</div>
			</div>
			<div className="charts">
				<PieChart />
			</div>
			<div className="terminated-students">
				<h2 className="title-heading">Students Terminated</h2>
				<div className="terminated-boxes">
					{mockList.map((item) => (
						<Terminated props={item} key={item.studentID} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Status;
