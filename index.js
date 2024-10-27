class t {
    addToDo(t, e) {
        return "" !== t.trim() && !(e < 1) && !(e > 3) && (this.todos.push({
            task: t,
            completed: !1,
            priority: e
        }),
        this.saveToLocalStorage(),
        !0)
    }
    constructor() {
        this.todos = [],
        this.loadFromLocalStorage()
    }
    markTodoCompleted(t) {
        t >= 0 && t < this.todos.length && (this.todos[t].completed = !0,
        this.saveToLocalStorage())
    }
    getTodos() {
        return this.todos
    }
    saveToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(this.todos))
    }
    loadFromLocalStorage() {
        let t = localStorage.getItem("todos");
        t && (this.todos = JSON.parse(t))
    }
    removeTodo(t) {
        t >= 0 && t < this.todos.length && (this.todos.splice(t, 1),
        this.saveToLocalStorage())
    }
}
document.addEventListener("DOMContentLoaded", () => {
    let e = new t;
    function o() {
        let t = document.getElementById("todoullist");
        t && (t.innerHTML = "");
        let d = e.getTodos();
        d.sort( (t, e) => t.priority - e.priority),
        d.forEach( (d, a) => {
            let l = document.createElement("li")
              , n = document.createElement("div");
            n.classList.add("taskcontainer");
            let s = document.createElement("div");
            s.classList.add("buttoncontainer");
            let r = document.createElement("button");
            r.innerText = "Markera som klar",
            r.setAttribute("data-index", a.toString()),
            r.addEventListener("click", t => {
                let d = t.target.getAttribute("data-index");
                if (null !== d) {
                    let t = parseInt(d, 10);
                    e.markTodoCompleted(t),
                    o()
                }
            }
            );
            let i = document.createElement("button");
            i.innerText = "Ta bort",
            i.setAttribute("data-index", a.toString()),
            i.addEventListener("click", t => {
                let d = t.target.getAttribute("data-index");
                if (null !== d) {
                    let t = parseInt(d, 10);
                    e.removeTodo(t),
                    o()
                }
            }
            ),
            l.innerHTML = `
                ${d.completed ? `<span class="completed-task">&#10004; </span><s>${d.task}` : d.task}</s>
                `,
            d.completed && l.classList.add("completed"),
            l.appendChild(n),
            l.appendChild(s),
            l.appendChild(r),
            l.appendChild(i),
            t?.appendChild(l)
        }
        )
    }
    let d = document.getElementById("todoform");
    d?.addEventListener("submit", function(t) {
        t.preventDefault();
        let d = document.getElementById("task").value
          , a = parseInt(document.getElementById("prio").value, 10);
        e.addToDo(d, a) ? (o(),
        document.getElementById("todoform").reset()) : alert("vänligen fyll i alla fält korrekt")
    });
    let a = document.getElementById("clearlist");
    a?.addEventListener("click", () => {
        confirm("Är du säker på att du vill rensa listan?") && (e.todos = [],
        e.saveToLocalStorage(),
        o())
    }
    ),
    o()
}
);

