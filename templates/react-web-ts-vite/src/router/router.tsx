import React, { lazy, Suspense, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import Layout from '@cpt/Layout/Layout'

const GetAsyncComponent = (path: string): ReactElement => {
	const Cpt = lazy(() => import(`../views/${path}.tsx`))
	return (
		<Suspense fallback={<h1>组件加载中....</h1>}>
			<Cpt />
		</Suspense>
	)
}

const routers = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '/', element: <Navigate to="/home" /> },
			{ path: '/home', element: <h1>这是首页</h1> },
			{ path: '/page1', element: GetAsyncComponent('Page1') },
			{ path: '/page2', element: GetAsyncComponent('Page2') },
			{ path: '*', element: <Navigate to="/404" /> },
		],
	},
	{ path: '/404', element: GetAsyncComponent('404') },
	{ path: '*', element: <Navigate to="/404" /> },
]

export default routers
