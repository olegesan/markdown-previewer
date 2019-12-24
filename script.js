marked.setOptions({
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });
  const placeholder = `# Welcome to my React Markdown Previewer!
  ## This is a sub-heading...
  ### And here's some other cool stuff:
    
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
    
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.com), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | ------------- 
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbererd lists too.
  1. Use just 1s if you want! 
  1. But the list goes on...
  - Even if you use dashes or asterisks.
  * And last but not least, let's not forget embedded images:
  
  ![React Logo w/ Text](https://goo.gl/Umyytc)
  `
  const PreviewText=()=>{
    return(
    <div id='preview'/>
    )
  }
  const RawTextField=({text,changeRawText})=>{
  
    return(
    <textarea id='editor'value={text}
     onChange={changeRawText}
    />
    )
  }
  const TopPanel = ({handleCopy})=>{
      return(
        <div className='topPanel'>
            <h2>Markdown Editor with Preview</h2>
            <button onClick={handleCopy}>
                copy HTML
            </button>
        </div>
      )
  }
  class App extends React.Component{
    constructor(props){
      super(props);
      this.state={
        rawText:placeholder,
        rawHTML:''
      }
      this.changeRawText = this.changeRawText.bind(this)
      this.handleCopy=this.handleCopy.bind(this)
    }
    componentDidMount(){
      let rawHTML= marked(placeholder)
      document.getElementById('preview').innerHTML=rawHTML
      this.setState(()=>{return {rawHTML}})
      autosize(document.getElementById('editor'))
    }
    handleCopy(){
        var copyText = this.state.rawHTML;
        const el = document.createElement('textarea');
        el.value = copyText;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        el.setSelectionRange(0, 99999)
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    changeRawText(e){
      let rawText = e.target.value
      let rawHTML = marked(rawText)
      this.setState({rawText, rawHTML})
      document.getElementById('preview').innerHTML=rawHTML
      autosize(document.getElementById('editor'))
    }
    render(){
      return(
        <div className='container'>
            <TopPanel handleCopy={this.handleCopy}/>
          <div className='texts'>
            <RawTextField text={this.state.rawText}
              changeRawText={this.changeRawText}/>
            <PreviewText />
          </div>
        </div>
      )
    }
  }
          
  ReactDOM.render(<App/>, document.getElementById('root'))