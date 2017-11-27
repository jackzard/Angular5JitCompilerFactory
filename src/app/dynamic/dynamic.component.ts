import {Component, ComponentFactory, ComponentRef, Input, OnInit, ViewContainerRef} from '@angular/core'
import {DynamicComponentModule} from './dynamic.module'

@Component({
	selector: 'dynamic-component',
	template: ``
})
export class DynamicComponent implements OnInit {
	@Input() template: any

	private ComponentRef: ComponentRef<any>

	constructor(
		private FactoryProvider: DynamicComponentModule,
		public ViewContainerRef: ViewContainerRef
	) {
		this.component = {}
	}

	ngOnInit() {

		if (this.ComponentRef) this.ViewContainerRef.clear()

		this.FactoryProvider
			.createComponentFactory(this.template)
			.then((factory: ComponentFactory<any>) => {

				this.ViewContainerRef.createComponent(factory)
			})


	}

}
