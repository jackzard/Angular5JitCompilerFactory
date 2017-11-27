import {CommonModule} from '@angular/common'
import {Compiler, Component, ComponentFactory, CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {DynamicComponent } from './dynamic.component'

@Injectable()
export class DynamicComponentModule {

	private cache: { [templateKey: string]: ComponentFactory<any> } = {}

	constructor(
		protected compiler: Compiler,
	) {
	}

	createComponentFactory(template: string): Promise<ComponentFactory<any>> {

		try {
			let factory = this.cache[template]
			if (factory) {
				return new Promise((resolve) => {
					resolve(factory)
				})
			}

			const componentType = this.createComponentType(template)
			const module = this.createComponentModule(componentType)

			return new Promise((resolve) => {
				this.compiler
					.compileModuleAndAllComponentsAsync(module)
					.then((moduleWithFactories) => {
						factory = moduleWithFactories
							.componentFactories.find(component => component.componentType === componentType)
						this.cache[template] = factory
						resolve(factory)
					})
					.catch(error => {

					})
			})
		} catch (e) {
		}

	}

	private createComponentType(tmpl: string) {
		const metadata = {
			template: tmpl.toString(),
		}

		const cmpClass = class DynamicComponent {

		}
		return Component(metadata)(cmpClass)
	}

	private createComponentModule(componentType: any) {

		const metadata = {
			imports: [
				BrowserModule,
				FormsModule,
				CommonModule
			],
			declarations: [componentType],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}
		const mdlClass = class DynamicModule {
		}

		return NgModule(metadata)(mdlClass)
	}
}
