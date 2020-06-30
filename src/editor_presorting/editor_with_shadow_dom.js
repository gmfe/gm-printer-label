import withShadowDom from '../common/editor_compoents/with_shadow_dom_hoc'
import Edit from '../common/editor_compoents/edit'
import editStore from './edit_store'
import withStore from '../common/editor_compoents/with_store_hoc'

export default withShadowDom(withStore(editStore)(Edit))
