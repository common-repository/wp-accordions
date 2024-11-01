<?php 
global $post;

ob_start();
wp_editor( '', 'initialize');
$editor = ob_get_clean(); // We do not need the editor on the page load so no echo.


include( PLUGINSPATH . 'includes/options-functions.php');
if( file_exists( TEMPLATESPATH . 'options.php' ) ) {
	include( TEMPLATESPATH . 'options.php');
}else{
	include( PLUGINSPATH . 'includes/options.php');
}

?>
<div class="input_fields_wrap handles exbnda ecolabs">
<button class="add_new_field_button nomabottom"><i class="fa fa-plus"></i> <span><?php _e('Add More Fields','wp-accordion'); ?></span></button>

<span class="loader-img"></span>
	<?php
		$total = 0;
        $accordion_meta_id = get_post_meta( $post->ID, 'accordion_meta_id', true );
        if ( !empty($accordion_meta_id) ){
			// $accordion_meta_id =  unserialize($accordion_meta_id);
			$i = 0;
			$total = count($accordion_meta_id);
			foreach($accordion_meta_id as $key => $value ){
			?>
				<div id="main-block<?php echo $i; ?>" class="main-block">
					<h2 class="block-head">
						   <span class="move"><i class="fa  fa-arrows-alt"></i></span>
						   <b class="expand"></b>
						   <input class="main-tile-input" type="text" value="<?php echo $value['block_main_name_top'] ?>" name="accordion_meta_id[<?php echo $i ; ?>][block_main_name_top]" placeholder="<?php _e('Title of Accordion','wp-accordion'); ?>" />
						   <a href="#" class="remove_field">X</a>
					</h2>
					<div class="options-holder" id="oh<?php echo $i ; ?>">
					<?php 
						wp_accordion_create_form($options_meta, $i, $key, $accordion_meta_id, 'accordion_meta_id');
					?>
					</div>
				</div>
		<?php
				$i++;
				sleep(1);
			}
		} else {
			?>
			<div id="main-block0" class="main-block">    
				<h2 class="block-head">
					<span class="move"><i class="fa  fa-arrows-alt"></i></span>
					<b class="expand"></b>
					<input class="main-tile-input" type="text" value="<?php _e('Title of Accordion','wp-accordion'); ?>" name="accordion_meta_id[0][block_main_name_top]" placeholder="<?php _e('Title of Accordion','wp-accordion'); ?>"/>
					<a href="#" class="remove_field">X</a>
				</h2>
				<div class="options-holder" id="oh0">
				<?php 
						wp_accordion_create_form($options_meta,"0","",'accordion_meta_id');
				?>
				</div>
			</div>
    <?php } 
	    echo '<input type="hidden" id="total_counter" value="' . $total . '" />';
    ?>
</div>
<style>#wp-content-wrap{display:none;}</style>