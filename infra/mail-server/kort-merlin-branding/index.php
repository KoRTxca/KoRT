<?php

class KortMerlinBrandingPlugin extends \RainLoop\Plugins\AbstractPlugin
{
    public function Init(): void
    {
        $this->addJs('js/merlin.js');
        $this->addCss('css/kort.css');
    }
}
