import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}






class Coder {

  secondLang!: string

  constructor(
    public readonly name: string,
    public music: string,
    private age: number,
    protected lang: string = 'typescript'
  ) {
    // this.name = name
    // this.age = age
    // this.lang = lang
    // this.music = music
  }

  public getLang() {
    return `Hello im ${this.age}`
  }
}


const dave = new Coder('dave', 'Rock', 33);



class Webdev extends Coder {

  constructor(public computer: string, name: string, music: string, age: number) {
    super(name, music, age)
  }

  public getLang() {
    return `I write ${this.lang}`
  }

}

const Sara = new Webdev('Amc', 'sara', 'lofi', 25)

//console.log(Sara.getLang())





interface Musician {
  name: string
  instrument: string
  play(action: string): string
}

class Guitarist implements Musician {
  // name: string
  // instrument: string;
  constructor(public name: string, public instrument: string) {
    // this.name = name
    // this.instrument = instrument
  }

  play(action: string): string {
    return `${this.name} ${action} the ${this.instrument}`
  }
}

const Page = new Guitarist('nabil', 'violet');




class Peeps {
  static count: number = 0
  static getCount(): number {
    return Peeps.count
  }

  public id: number

  constructor(public name: string) {
    this.id = ++Peeps.count
  }
}

const Jhon = new Peeps('Jhon')
const Steve = new Peeps('Steve')
const Amy = new Peeps('Amy');




class Bands {

  constructor(public dataSet: string[]) {
    // this.dataSet = []
  }

  public get data(): string[] {
    return this.dataSet
  }

  public set data(value: string[]) {
    if (Array.isArray(value) && value.every(val => typeof val === 'string')) {
      this.dataSet = value
      return
    } else {
      throw Error('Params is not am array ')
    }
  }
}





// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    </QueryClientProvider>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
