import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'

const BasicHeader = () => {
	return (
		<div className={styles.header}>
			<NavLink
				to="/home"
				className={({ isActive }) => (isActive ? styles.selected : undefined)}
			>
				首页
			</NavLink>
			<NavLink
				to="/page1"
				className={({ isActive }) => (isActive ? styles.selected : undefined)}
			>
				page1
			</NavLink>
			<NavLink
				to="/page2"
				className={({ isActive }) => (isActive ? styles.selected : undefined)}
			>
				page2
			</NavLink>
		</div>
	)
}

export default BasicHeader
