import * as d3 from 'd3';
import _ from 'lodash';

import { FILE_PATH } from '../conf/paths';

export const loadData = async () => {
  const raw = await d3.csv(FILE_PATH);
  let formated = [];
  raw.forEach(object => {
    formated.push(
      _.values(
        _.mapValues(object, (value, key) => { 
          return { key,
            label: _.startCase(key),
            shortLabel: _.words(_.startCase(key)).reduce((string, word) => string += word[0], ''),
            value: parseInt(value),
          }; 
        })
      )
    ) 
  });
  return formated;
}