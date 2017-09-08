/*
	 
 Version: 2.2
 Author: Mao PC エンジニア
 Docs: http://www.mao-engineer.jp/

*/

$(function(){
	//--変数初期値
	var fomElm=$("#sendmail"); //メールフォームのエレメント
	var err=false; //データをチェックしエラーがあるか
	var lockHtml="<div id=\"lock\"><img src=\"img/load.gif\" /></div>"; //画面ロック時に挿入される画像
	var mandatory_Err="<span class=\"label label-danger error\">エラー：必須項目</span>";//--エラー項目(class=\"error\" を必ずつける)
	var mail_Err="<span class=\"label label-danger error\">エラー：メール形式不正</span>";
	var address;
	
	//--サブミットされると実行
	fomElm.submit(function(event){ 
	 	
		//--初期化処理
		event.preventDefault(); //通常のサブミットキャンセル
		err=false; //エラーの初期化
		$(".error").remove(); //表示していたエラーの削除

		data= fomElm.serializeArray(); //フォームのデータ取得
		var data_num=data.length-1;
		
		for(var i = 0; data_num>=i; i++){ //フォームのデータのチェック
			var arr_Err_output=valCheck(data[i]);

			if(!(arr_Err_output=="")){ //エラーがある場合はエラー出力
				printErr(data[i].name, arr_Err_output);
				err=true;

			}	

		}	

		//エラーがなければ送信 ajax で送信
		if(!err){
			
			lockWindow(); //画面ロック
			json = JSON.stringify(data); //オブジェクトを json に変換
			
			$.ajax({
				url: $(this).attr("action"),
				type: $(this).attr("method"),
				data: {data:  json , address: address},
				success: function(data){
					if(data){

						alert("メール送信に成功しました。");
						$(fomElm).find("textarea, :text, select").val("").end().find(":checked").prop("checked", false);

					}else{

						alert("メール送信に失敗しました。時間をおいてもう一度試してください。");

					}
        			},
				error: function(data){

						alert("通信に失敗しました。時間をおいてもう一度試してください。");


        			},

				complete: function(msg){
					unlockWindow();
				}
			})

		}

	});	
	
	//--チェック関数
	function valCheck(_data) {
			
		var dataCheck = $("*[name="+_data.name+"]").attr("dataCheck");
		var arr_Err_output = new Array();
		
		if(!(typeof dataCheck==="undefined")){

	
			//必須チェック
			if(dataCheck.indexOf("mandatory")>=0){				

					if(!_data.value) arr_Err_output.push(mandatory_Err);
	
			}
			
			//メール形式チェックエラーがなければメールアドレス格納
			if(dataCheck.indexOf("mail")>=0){
								
					if(_data.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
					
					address=_data.value;
					
					}else{
						arr_Err_output.push(mail_Err);
					}
	
			}

		
		}
		

		
	return 	arr_Err_output;
					
	}
	
	//エラープリント関数
	function printErr(_name,_arr_Err_output) {
						

		var data_num=_arr_Err_output.length-1;
		for(var i = 0; data_num>=i; i++){
		
		$("*[name="+_name+"]").before(_arr_Err_output[i]);
		
		}
		
	}
	
	//画面ロック＆インジケータ表示
	function lockWindow(){
		$("body").prepend(lockHtml);
		var $window = $(window),
		$img = $("#lock > img");
		$img.css({"marginTop":(($window.height() - $img.height()) / 2) + "px"});		
		$("#lock").fadeIn();
	  }
	  
	  function unlockWindow(){
		$("#lock").fadeOut();
		$("#lock").remove();	

	  }
	  
});