'use strict';
module.exports = (sequelize, DataTypes) => {
  const twitterUser = sequelize.define('twitterUser', {
    twitterId: DataTypes.STRING
  }, {});
  twitterUser.associate = function(models) {
    // associations can be defined here
  };
  return twitterUser;
};