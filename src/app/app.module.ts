import {BrowserModule} from '@angular/platform-browser';
import {Compiler, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {DynamicComponent} from "./dynamic/dynamic.component";
import {JitCompilerFactory} from "@angular/platform-browser-dynamic";
import {DynamicComponentModule} from "./dynamic/dynamic.module";

export function compilerFactory() {
	return new JitCompilerFactory([{useJit: true}]).createCompiler()
}

@NgModule({
	declarations: [
		AppComponent,
		DynamicComponent
	],
	imports: [
		BrowserModule
	],
	providers: [
		DynamicComponentModule,
		{provide: Compiler, useFactory: compilerFactory}
		],
	bootstrap: [AppComponent]
})
export class AppModule {
}
