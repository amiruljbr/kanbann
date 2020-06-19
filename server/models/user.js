'use strict';
const bcrypt=require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model{

  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [6,15]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail:true
      }
    },
    organization: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {sequelize});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task);
  };

  User.addHook('beforeCreate',(user,options)=>{
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    user.organization='Hacktiv8';
  })

  return User;
};