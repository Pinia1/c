
interface TaskList {
    [key: string]: Function[]
}

/**发布订阅 */
class subscriber {
    /**任务队列 */
    private static taskList: TaskList = {}
    /**发布 */
    static on(name: string, cb: (...arg: any[]) => void) {
        if (!this.taskList[name]) this.taskList[name] = []
        this.taskList[name].push(cb)
    }
    /**once */
    static once(name: string, cb: (...arg: any) => void) {
        if (this.taskList[name]) {
            cb()
            const index = this.taskList[name].findIndex(item => item == cb)
            this.taskList[name].splice(index, 1)
        }
    }
    /**订阅 */
    static emit(name: string, ...arg: any[]) {
        if (!this.taskList[name]) {
            throw 'There is no such event'
        }
        this.taskList[name].forEach(cb => cb(...arg))
    }
    /**卸载 */
    static remove(name: string, cb: (...arg: any) => void) {
        if (this.taskList[name]) {
            const index = this.taskList[name].findIndex(item => item == cb)
            this.taskList[name].splice(index, 1)
        }
    }
}


export default subscriber;