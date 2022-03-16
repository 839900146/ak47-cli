import React, { FC } from 'react'
import styles from './index.module.scss'
import BasicHeader from '@cpt/BasicHeader/BasicHeader'
import { Outlet } from 'react-router-dom'
const Layout: FC = () => {
	return (
		<div className={styles.layoutContent}>
			<BasicHeader />
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
