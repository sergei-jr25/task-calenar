declare module '*.module.scss' {
	interface IclassName {
		[className: string]: string
	}

	const className: IclassName
	export = className
}

declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.svg' {
	import React from 'react'
	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
	export default SVG
}
declare const __PLATFORM__: 'mobile' | 'desktop'
