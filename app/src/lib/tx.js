const $ = require('jquery');
const tippy = require('tippy.js');
const key = require('./key');
const connect = require('./connect');
const nodeTest = require('./nodeTest');
const CreateTransaction = require('./signature');

function create(keyPublic) {
  $('input[type="text"]').css({"border" : "", "box-shadow" : ""});
  $('#tokeyError').hide();
  $('#tosendError').hide();
  $('#maxfeeError').hide();

  let regexp = /^\d+(\.\d{1,18})?$/;
  cont = true;

  to = $('#tokey').val();
  amount = $('#tosend').val();
  amount = amount.replace(/,/, '.');
  maxfee = $('#maxfee').val();
  maxfee = maxfee.replace(/,/, '.');

  if(amount.charAt(0) == '.') {
    amount = "0" + amount;
  }

  if(maxfee.charAt(0) == '.') {
    maxfee = "0" + maxfee;
  }

  if(to == keyPublic) {
    $('#tokey').css("border","2px solid red");
    $('#tokey').css("box-shadow","0 0 3px red");
  $('#tippytoKey').attr("data-tippy-content", "<p style=\"font-size:12px;\">You can't send a transaction to yourself</p>");
  $('#tokeyError').show();
    cont = false;
  }

  if(to == '' || to.length < 43 || to.length > 45) {
    $('#tokey').css("border","2px solid red");
    $('#tokey').css("box-shadow","0 0 3px red");
  $('#tippytoKey').attr("data-tippy-content", "<p style=\"font-size:12px;\">Please enter a valid public key</p>");
  $('#tokeyError').show();
    cont = false;
  }

  if(amount == '') {
    $('#tosend').css("border","2px solid red");
    $('#tosend').css("box-shadow","0 0 3px red");
  $('#tippytoSend').attr("data-tippy-content", "<p style=\"font-size:12px;\">Please enter an amount</p>");
  $('#tosendError').show();
    cont = false;
  } else {
      if(regexp.test(amount) != true) {
        $('#tosend').css("border","2px solid red");
        $('#tosend').css("box-shadow","0 0 3px red");
        $('#tippytoSend').attr("data-tippy-content", "<p style=\"font-size:12px;\">Please enter a valid amount</p>");
        $('#tosendError').show();
        cont = false;
      }
    }

  if(maxfee == '') {
    $('#maxfee').css("border","2px solid red");
    $('#maxfee').css("box-shadow","0 0 3px red");
    $('#tippymaxfee').attr("data-tippy-content", "<p style=\"font-size:12px;\">Please enter an amount</p>");
    $('#maxfeeError').show();
    cont = false;
  } else {
      if(regexp.test(maxfee) != true) {
        $('#maxfee').css("border","2px solid red");
        $('#maxfee').css("box-shadow","0 0 3px red");
        $('#tippymaxfee').attr("data-tippy-content", "<p style=\"font-size:12px;\">Please enter a valid amount</p>");
        $('#maxfeeError').show();
        cont = false;
      }
    }

  if(!cont) { // Show error if one of the checks failed.
tippy('.txerrortippy', {
  interactive: true,
  arrow: true,
  arrowType: 'round',
});
  }


  if(cont) {
  if(amount.length > 8) {
    $('.confirmsize').css("font-size","18px");
  } else {
    $('.confirmsize').css("font-size","24px");
  }
  $('#tokeyError').hide();
    $('#transactionto').text(to);
    $('#tosendto').text(amount);
    $('#tosend').text(amount);
    $('#maxfeeto').text(maxfee);
    $('#transactionto2').text(to);
    $('#tosendto2').text(amount);
    $('#maxfeeto2').text(maxfee);
    $('#initialTX').slideUp(250);
    $("#createTX").slideUp(250, function () {
      $("#confirmTX").slideDown(250);
      $("#confirmTXinfo").slideDown(250);
      $("#confirmButtons").slideDown(250);
  });
  }
}

async function send(n = 0) {
  $('#txerror').empty();
  $('#txerror').removeClass();

  $('#confirmTXinfo').slideUp(250);
  $("#confirmButtons").slideUp(250, function () {
    $('#confirmedTX').slideDown(250);
    $('#completeButtons').slideDown(250);
    $('#completed').slideDown(1000);
});

  let to = $('#tokey').val();
  let amount = $('#tosend').val();
  let maxfee = $('#maxfeeto').val();


  if(!cont) { // Show error if one of the checks failed.
    $('#txerror').addClass("alert alert-danger");
    $('#txerror').show();
  }

  let Trans = CreateTransaction({
    Amount: amount,
    Fee: maxfee,
    Source: await key.exportPublic(n),
    PrivateKey: await key.exportPrivate(n),
    Target: to
  }).then(function(r) {
      console.log(r);
      if(r.error) {
        console.error(r.message);
      } else {
        nodeTest().then(function(nr) {
          connect().TransactionFlow(r.Result, function(err, r) {
            console.log(r);
          });
        });
      }
    });
}

module.exports = {
  create,
  send
};