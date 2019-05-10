import { configure } from 'enzyme';
import Adapter  from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
configure({verbose: true,
moduleFileExtensions: [
     "ts",
     "tsx",
     "js",
     "jsx",
     "json",
     "node"
   ]})
