//
// Autogenerated by Thrift Compiler (0.11.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;

var general_ttypes = require('./general_types');
var api_ttypes = require('./api_types');


var ttypes = module.exports = {};
var GetSeedResult = module.exports.GetSeedResult = function(args) {
  this.status = null;
  this.seed = null;
  if (args) {
    if (args.status !== undefined && args.status !== null) {
      this.status = new general_ttypes.APIResponse(args.status);
    }
    if (args.seed !== undefined && args.seed !== null) {
      this.seed = args.seed;
    }
  }
};
GetSeedResult.prototype = {};
GetSeedResult.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.status = new general_ttypes.APIResponse();
        this.status.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.seed = input.readBinary();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

GetSeedResult.prototype.write = function(output) {
  output.writeStructBegin('GetSeedResult');
  if (this.status !== null && this.status !== undefined) {
    output.writeFieldBegin('status', Thrift.Type.STRUCT, 1);
    this.status.write(output);
    output.writeFieldEnd();
  }
  if (this.seed !== null && this.seed !== undefined) {
    output.writeFieldBegin('seed', Thrift.Type.STRING, 2);
    output.writeBinary(this.seed);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var SendTransactionResult = module.exports.SendTransactionResult = function(args) {
  this.status = null;
  if (args) {
    if (args.status !== undefined && args.status !== null) {
      this.status = new general_ttypes.APIResponse(args.status);
    }
  }
};
SendTransactionResult.prototype = {};
SendTransactionResult.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.status = new general_ttypes.APIResponse();
        this.status.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

SendTransactionResult.prototype.write = function(output) {
  output.writeStructBegin('SendTransactionResult');
  if (this.status !== null && this.status !== undefined) {
    output.writeFieldBegin('status', Thrift.Type.STRUCT, 1);
    this.status.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var SmartContractGetResult = module.exports.SmartContractGetResult = function(args) {
  this.status = null;
  this.byteCodeObjects = null;
  this.contractState = null;
  this.stateCanModify = null;
  if (args) {
    if (args.status !== undefined && args.status !== null) {
      this.status = new general_ttypes.APIResponse(args.status);
    }
    if (args.byteCodeObjects !== undefined && args.byteCodeObjects !== null) {
      this.byteCodeObjects = Thrift.copyList(args.byteCodeObjects, [general_ttypes.ByteCodeObject]);
    }
    if (args.contractState !== undefined && args.contractState !== null) {
      this.contractState = args.contractState;
    }
    if (args.stateCanModify !== undefined && args.stateCanModify !== null) {
      this.stateCanModify = args.stateCanModify;
    }
  }
};
SmartContractGetResult.prototype = {};
SmartContractGetResult.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.status = new general_ttypes.APIResponse();
        this.status.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.byteCodeObjects = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = new general_ttypes.ByteCodeObject();
          elem6.read(input);
          this.byteCodeObjects.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.contractState = input.readBinary();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.BOOL) {
        this.stateCanModify = input.readBool();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

SmartContractGetResult.prototype.write = function(output) {
  output.writeStructBegin('SmartContractGetResult');
  if (this.status !== null && this.status !== undefined) {
    output.writeFieldBegin('status', Thrift.Type.STRUCT, 1);
    this.status.write(output);
    output.writeFieldEnd();
  }
  if (this.byteCodeObjects !== null && this.byteCodeObjects !== undefined) {
    output.writeFieldBegin('byteCodeObjects', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.STRUCT, this.byteCodeObjects.length);
    for (var iter7 in this.byteCodeObjects)
    {
      if (this.byteCodeObjects.hasOwnProperty(iter7))
      {
        iter7 = this.byteCodeObjects[iter7];
        iter7.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.contractState !== null && this.contractState !== undefined) {
    output.writeFieldBegin('contractState', Thrift.Type.STRING, 3);
    output.writeBinary(this.contractState);
    output.writeFieldEnd();
  }
  if (this.stateCanModify !== null && this.stateCanModify !== undefined) {
    output.writeFieldBegin('stateCanModify', Thrift.Type.BOOL, 4);
    output.writeBool(this.stateCanModify);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var PoolGetResult = module.exports.PoolGetResult = function(args) {
  this.status = null;
  this.pool = null;
  if (args) {
    if (args.status !== undefined && args.status !== null) {
      this.status = new general_ttypes.APIResponse(args.status);
    }
    if (args.pool !== undefined && args.pool !== null) {
      this.pool = args.pool;
    }
  }
};
PoolGetResult.prototype = {};
PoolGetResult.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.status = new general_ttypes.APIResponse();
        this.status.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.pool = input.readBinary();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

PoolGetResult.prototype.write = function(output) {
  output.writeStructBegin('PoolGetResult');
  if (this.status !== null && this.status !== undefined) {
    output.writeFieldBegin('status', Thrift.Type.STRUCT, 1);
    this.status.write(output);
    output.writeFieldEnd();
  }
  if (this.pool !== null && this.pool !== undefined) {
    output.writeFieldBegin('pool', Thrift.Type.STRING, 2);
    output.writeBinary(this.pool);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

