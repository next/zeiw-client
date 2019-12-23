import { Component } from 'preact'
import jssCamelCase from 'jss-camel-case'
import { create as jssCreate } from 'jss'
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
    if (0 === sheetReferences) {
      sheet.detach()
    } else if (1 === sheetReferences) {
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
