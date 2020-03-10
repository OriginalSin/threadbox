/*--------------------------------------------------------------------------

ThreadBox - Recursive Multi-Threaded Worker Processes in NodeJS

The MIT License (MIT)

Copyright (c) 2020 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

import { Reflect } from '../reflect/index'

/** 
 * Searches an instance for any `transferList` candidates. 
 * This is required for transmitting these objects via 
 * `postMessage(...)`. An example of which is `MessagePort`.
 */
export class MarshalTransferList {

    /** Search the given instance for `transferList` candidates. */
    public static search(instance: any): any[] {
        // null and undefined have none.
        if(instance === null || instance === undefined) {
            return []
        }
        // A Message Port is.
        if(Reflect.isMessagePort(instance)) {
            return [instance]
        }
        // An Object may have some.
        if(Reflect.isObject(instance)) {
            const list = []
            for(const key of Object.keys(instance)) {
                list.push(...this.search(instance[key]))
            }
            return list
        }
        // An Array may have some.
        if(Reflect.isArray(instance)) {
            const list = []
            for(const value of instance) {
                list.push(...this.search(value))
            }
            return list
        }
        // None found.
        return []
    }
}