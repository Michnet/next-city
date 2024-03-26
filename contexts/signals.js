import {signal} from "@preact/signals-react";

export const counterSignal = signal(724);

export const snackNotification = signal({message: '', color:'green-dark', icon:"fa fa-check"});