(function(a){a(function(){a("#edit-full-width").change(function(){if(a(this).is(":checked")){a(".form-item-width label").text("Effect zone width")}else{a(".form-item-width label").text("Width")}}).trigger("change");b("#edit-thumbnail-position","tp",4);b("#edit-border-style","bs",10);b("#edit-dropshadow-style","ds",6);function b(c,e,g){var h='<div class="'+e+'wrap clearfix">';var f=0;for($i=0;$i<=g;$i++){f=a(c+" option:eq("+$i+")").val();if(f){h+='<div id="'+e+f+'" class="slitem"></div>'}}h+="</div>";a(c).parent().append(h);var d=a(c+" option[selected]").val();a("#"+e+d).addClass("selected");a("."+e+"wrap .slitem").each(function(){a(this).click(function(){a("."+e+"wrap .selected").removeClass("selected");a(this).addClass("selected");a(c+" option[selected]").removeAttr("selected");tmpindex=a(this).attr("id").replace(e,"");a(c+" option[value="+tmpindex+"]").attr("selected","selected")})});a(c).hide()}})})(jQuery);