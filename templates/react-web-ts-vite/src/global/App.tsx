import React from 'react'
import { useRoutes } from 'react-router-dom'
import Routers from '@/router/router'

function App() {
	const element = useRoutes(Routers)

	return element
}

export default App
