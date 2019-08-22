import { Component } from 'preact'
import { create as jssCreate } from 'jss'
import jssCamelCase from 'jss-camel-case'
import jssNested from 'jss-nested'
import jssVendorPrefixer from 'jss-vendor-prefixer'

const jss = jssCreate()
jss.use(jssCamelCase(), jssNested(), jssVendorPrefixer())

export default (styles, Wrap) => {
  const sheet = jss.createStyleSheet(styles, {
    classNamePrefix: '_'
  })
  let sheetReferences = 0
  const handleSheetReferenceChange = change => {
    sheetReferences += change
    if (sheetReferences === 0) {
      sheet.detach()
    } else if (sheetReferences === 1) {
      sheet.attach()
    }
  }
  return class withStyles extends Component {
    componentDidMount() {
      handleSheetReferenceChange(1)
    }

    componentWillUnmount() {
      handleSheetReferenceChange(-1)
    }

    render() {
      return <Wrap {...this.props} classes={sheet.classes} />
    }
  }
}
